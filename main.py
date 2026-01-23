import os
import datetime
import logging
from typing import List, Optional

# --- HÁLÓZAT ÉS AI ---
import openai
import motor.motor_asyncio
import httpx  # A gyors, aszinkron "Hacker" böngésző
from bs4 import BeautifulSoup
from fake_useragent import UserAgent  # Álcázás

# --- WEB FRAMEWORK ---
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- BIZTONSÁG & KRIPTOGRÁFIA ---
from jose import JWTError, jwt
from passlib.context import CryptContext

# --- BANKI ADATBÁZIS MOTOR (SQL) ---
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# --- GITHUB INTEGRÁCIÓ ---
from github import Github

# ==========================================
# ⚙️ 1. KONFIGURÁCIÓ & VÉDELEM
# ==========================================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ProfitAgent")

SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_hacker_key_change_me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440 # 24 óra

# KÖRNYEZETI VÁLTOZÓK
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_URL = os.getenv("DATABASE_URL") # PostgreSQL a Railway-től
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI(title="Profit Agent - Banker Edition", description="AI Powered Financial Coding System")

# CORS (Hogy bárhonnan elérd)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# ==========================================
# 🏦 2. ADATBÁZISOK (A Pénz és a Tudás)
# ==========================================

# A. TUDÁS (MongoDB - NoSQL)
# Ide menti a cikkeket, stratégiákat, amiket a netről tanul.
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
mongo_db = mongo_client.profit_agent
knowledge_base = mongo_db.knowledge

# B. PÉNZÜGYI MAG (PostgreSQL - SQL)
# Ez a "Banki Széf". Itt kezeljük majd a tranzakciókat, felhasználókat.
# Ha nincs megadva DATABASE_URL (pl. local teszt), SQLite-ot használ átmenetileg.
SQL_URL = DATABASE_URL if DATABASE_URL else "sqlite:///./profit_agent_local.db"
# Javítás Railway Postgres URL-hez (postgres:// -> postgresql://)
if SQL_URL and SQL_URL.startswith("postgres://"):
    SQL_URL = SQL_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQL_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Adatbázis Modell (Példa User tábla a banki rendszerhez)
class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    balance = Column(Float, default=0.0) # Egyenleg
    mlm_level = Column(Integer, default=1) # MLM szint

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 🧠 3. AZ AGENT LOGIKÁJA
# ==========================================

client = openai.OpenAI(api_key=OPENAI_API_KEY)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class TaskRequest(BaseModel):
    prompt: str
    project_name: str
    focus: str = "general" # general, banking, mlm, security

class LearnRequest(BaseModel):
    url: str
    notes: str = ""

class DeployRequest(BaseModel):
    project_name: str
    code_content: str
    file_name: str

# SYSTEM PROMPT - A Személyiség
SYSTEM_INSTRUCTION = """
Te egy ELIT SOFTWARE ARCHITECT és PÉNZÜGYI MÉRNÖK vagy.
A célod: Olyan kódokat írni, amelyek pénzt termelnek, biztonságosak és skálázhatók.

SPECIALITÁSOK:
1. **Banki Rendszerek:** Tranzakciókezelés (ACID), Double-entry bookkeeping, SQL.
2. **MLM/Affiliate:** Mátrix rendszerek, jutalék számítás, fa-struktúrák.
3. **Biztonság:** Minden inputot validálj! Használj modern titkosítást.
4. **Scraping:** Ha adatszerzés a feladat, légy láthatatlan (User-Agent rotation).
"""

# ==========================================
# 🕵️‍♂️ 4. VÉGPONTOK (A Funkciók)
# ==========================================

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# --- TOKEN GENERÁLÁS (Admin belépés) ---
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Itt később lecseréljük adatbázis alapú ellenőrzésre
    if form_data.username == "faqu" and form_data.password == "admin123":
        token_data = {"sub": form_data.username}
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Hibás adatok")

# --- GHOST SCRAPER (Tanulás) ---
@app.post("/learn")
async def learn_from_url(request: LearnRequest, token: str = Depends(oauth2_scheme)):
    ua = UserAgent()
    headers = {'User-Agent': ua.random} # Minden kérésnél másnak álcázza magát

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client_http:
            response = await client_http.get(request.url, headers=headers, timeout=15.0)

        if response.status_code != 200:
            return {"status": "error", "message": f"Hiba: {response.status_code}"}

        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = " ".join([p.get_text() for p in soup.find_all(['p', 'h1', 'h2', 'h3', 'li', 'article'])])

        # AI Összefoglaló készítése
        ai_summary = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Elemezd ezt a szöveget PROFIT szempontból. Keresd a piaci réseket, technikai megoldásokat."},
                {"role": "user", "content": text_content[:15000]}
            ]
        )
        summary = ai_summary.choices[0].message.content

        # Mentés a MongoDB-be
        await knowledge_base.insert_one({
            "url": request.url,
            "summary": summary,
            "crawled_at": datetime.datetime.utcnow(),
            "type": "market_research"
        })

        return {"status": "success", "summary": summary}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# --- MASTER MIND (Chat & Code Generálás) ---
@app.post("/generate")
async def generate_code(request: TaskRequest, token: str = Depends(oauth2_scheme)):
    # 1. Tudás betöltése (Mit tanultunk mostanában?)
    recent_knowledge = await knowledge_base.find().sort("crawled_at", -1).limit(3).to_list(length=3)
    context_text = "\n".join([f"- TUDÁS ({k['url']}): {k['summary']}" for k in recent_knowledge])

    # 2. Speciális Prompt építése
    chat_system_prompt = f"""
    {SYSTEM_INSTRUCTION}
    
    JELENLEGI TUDÁSBÁZIS (Amit a netről tanultál):
    {context_text}
    
    FELHASZNÁLÓ PROJEKTJE: {request.project_name}
    
    UTASÍTÁS:
    Te egy interaktív fejlesztő társ vagy.
    - Válaszolj magyarul, közvetlenül a felhasználónak.
    - Ha kódot kérsz, azt Markdown code blockban add meg (```python ... ```).
    - Használd a tanult tudást a kontextusból.
    - Ha a felhasználó banki rendszert kér, használj SQLAlchemy-t.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": chat_system_prompt},
                {"role": "user", "content": request.prompt}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- DEPLOY AGENT (GitHub Feltöltés) ---
@app.post("/deploy-github")
async def push_to_github(request: DeployRequest, token: str = Depends(oauth2_scheme)):
    if not GITHUB_TOKEN:
        raise HTTPException(status_code=400, detail="Nincs GITHUB_TOKEN!")

    try:
        g = Github(GITHUB_TOKEN)
        user = g.get_user()

        # Repo keresése vagy létrehozása (Okosabb verzió)
        try:
            repo = user.get_repo(request.project_name)
        except:
            repo = user.create_repo(request.project_name, private=True) # Alapból PRIVÁT repo a biztonságért!

        try:
            contents = repo.get_contents(request.file_name)
            repo.update_file(contents.path, f"AI Update {datetime.datetime.now()}", request.code_content, contents.sha)
        except:
            repo.create_file(request.file_name, "AI Init", request.code_content)

        return {"status": "success", "url": repo.html_url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))