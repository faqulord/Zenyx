import os
import datetime
import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from openai import OpenAI
import motor.motor_asyncio
from jose import JWTError, jwt
from passlib.context import CryptContext
from github import Github

# --- KONFIGURÁCIÓ ---
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey123")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI(title="Profit Agent Master")
templates = Jinja2Templates(directory="templates")

# Kliensek
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = mongo_client.profit_agent
knowledge_base = db.knowledge # Itt tárolja, amit megtanul

# Biztonság
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- MODELLEK ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TaskRequest(BaseModel):
    prompt: str
    project_name: str

class LearnRequest(BaseModel):
    url: str
    note: str = "Market Research"

class DeployRequest(BaseModel):
    project_name: str
    code_content: str
    file_name: str

# --- SYSTEM PROMPT (A Profit Generáló Személyiség) ---
SYSTEM_INSTRUCTION = """
Te egy AUTONÓM PROFIT-ORIENTÁLT FEJLESZTŐ AGENT vagy.
A Felhasználó (Project Manager) utasításait hajtod végre.

SZABÁLYOK:
1. **Profit First:** A kódod legyen eladható, skálázható és biztonságos.
2. **Tanulás:** Használd fel a "CONTEXT" részben kapott tudást (amit a netről tanultál).
3. **Full Stack:** Ha weboldalt kérnek, írj HTML/CSS/JS/Python kódot egyben vagy fájlonként.
4. **Nincs rizsa:** Ne magyarázz feleslegesen. Kódot és megoldást adj.

Ha a felhasználó linket küldött korábban, építsd be azt a tudást a fejlesztésbe!
"""

# --- SEGÉDFÜGGVÉNYEK ---
def verify_user(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username == "faqu" and form_data.password == "admin123":
        return form_data.username
    raise HTTPException(status_code=400, detail="Hibás adatok")

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = verify_user(form_data)
    return {"access_token": create_access_token(data={"sub": user}), "token_type": "bearer"}

# 1. TANULÁS MODUL (Web Scraper)
@app.post("/learn")
async def learn_from_url(request: LearnRequest, user: str = Depends(get_current_user)):
    try:
        # Letöltjük a weboldalt
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(request.url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            return {"status": "error", "message": "Nem sikerült elérni az oldalt."}

        # Kinyerjük a szöveget
        soup = BeautifulSoup(response.text, 'html.parser')
        # Csak a lényeges szövegeket szedjük ki (p, h1, h2, li)
        text_content = " ".join([p.get_text() for p in soup.find_all(['p', 'h1', 'h2', 'li'])])
        
        # Tömörítjük AI-val, hogy csak a lényeg maradjon
        summary_response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Te egy kutató vagy. Foglald össze a következő szövegből a technikai és üzleti lényeget max 5 mondatban. PROFIT a cél."},
                {"role": "user", "content": text_content[:15000]} # Limitáljuk a hosszt
            ]
        )
        summary = summary_response.choices[0].message.content

        # Mentés a Memóriába
        await knowledge_base.insert_one({
            "url": request.url,
            "summary": summary,
            "raw_text": text_content[:2000], # Mentünk egy kicsit a nyersből is
            "date": datetime.datetime.utcnow()
        })
        
        return {"status": "success", "summary": summary, "message": "Megtanultam és elmentettem az adatbázisba!"}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# 2. GENERÁLÁS MODUL (Agy)
@app.post("/generate")
async def generate_code(request: TaskRequest, user: str = Depends(get_current_user)):
    # Először megnézzük a memóriát (Mit tanultunk utoljára?)
    recent_knowledge = await knowledge_base.find().sort("date", -1).limit(3).to_list(length=3)
    context_text = "\n".join([f"MEGTANULT TUDÁS ({k['url']}): {k['summary']}" for k in recent_knowledge])

    full_prompt = f"{SYSTEM_INSTRUCTION}\n\nJELENLEGI TUDÁSBÁZIS:\n{context_text}"

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": full_prompt},
                {"role": "user", "content": f"PROJECT: {request.project_name}\nTASK: {request.prompt}"}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. GITHUB MODUL (Kézbesítés)
@app.post("/deploy-github")
async def push_to_github(request: DeployRequest, user: str = Depends(get_current_user)):
    if not GITHUB_TOKEN:
        raise HTTPException(status_code=400, detail="Nincs GITHUB_TOKEN beállítva!")
    
    try:
        g = Github(GITHUB_TOKEN)
        user_gh = g.get_user()
        
        # Meglévő repo keresése
        try:
            repo = user_gh.get_repo(request.project_name)
        except:
            raise HTTPException(status_code=404, detail=f"Nem találom a '{request.project_name}' repót. Hozd létre előbb a GitHubon!")

        # Fájl létrehozása vagy frissítése
        try:
            contents = repo.get_contents(request.file_name)
            repo.update_file(contents.path, "AI Update", request.code_content, contents.sha)
            return {"status": "updated", "url": repo.html_url}
        except:
            repo.create_file(request.file_name, "AI Init", request.code_content)
            return {"status": "created", "url": repo.html_url}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GitHub Error: {str(e)}")
