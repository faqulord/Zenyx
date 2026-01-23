import os
import datetime
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from openai import OpenAI
import motor.motor_asyncio
from jose import JWTError, jwt
from passlib.context import CryptContext

# --- KONFIGURÁCIÓ ---
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey123") # Ezt majd a Railwayen állítjuk
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# --- INICIALIZÁLÁS ---
app = FastAPI(title="Profi AI Code Agent")
templates = Jinja2Templates(directory="templates")

# Adatbázis & AI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = mongo_client.code_platform

# Biztonság (Jelszókezelés)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- MODELLEK ---
class Token(BaseModel):
    access_token: str
    token_type: str

class CodeRequest(BaseModel):
    prompt: str
    project_name: str

# --- SYSTEM PROMPT (AZ AGY) ---
SYSTEM_INSTRUCTION = """
Te egy ELIT SZOFTVER ARCHITECT és "REPLIT AGENT" vagy.
NEM csak csevegsz. Kódot gyártasz.
Feladatod:
1. Elemezd a kérést üzleti és technikai szempontból.
2. Generálj PROFI, strukturált kódot.
3. Ha banki/pénzügyi rendszert kérnek: MAXIMÁLIS BIZTONSÁG.
4. Ha üzleti rendszert (MLM, Shop): PROFIT-ORIENTÁLT logikát építs be.
Válasz formátuma: Használj Markdown kódblokkokat!
"""

# --- BIZTONSÁGI FUNKCIÓK ---
def verify_user(form_data: OAuth2PasswordRequestForm = Depends()):
    # ITT VAN A FIX BELÉPŐ: faqu / admin123
    if form_data.username == "faqu" and form_data.password == "admin123":
        return form_data.username
    raise HTTPException(status_code=400, detail="Hibás felhasználónév vagy jelszó")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Érvénytelen token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Érvénytelen token")

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = verify_user(form_data)
    access_token = create_access_token(data={"sub": user})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/generate")
async def generate_code(request: CodeRequest, current_user: str = Depends(get_current_user)):
    # 1. Mentés az előzményekbe
    await db.history.insert_one({
        "user": current_user,
        "prompt": request.prompt,
        "timestamp": datetime.datetime.utcnow()
    })

    # 2. AI Generálás
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": SYSTEM_INSTRUCTION},
                {"role": "user", "content": f"Project: {request.project_name}\nTask: {request.prompt}"}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
