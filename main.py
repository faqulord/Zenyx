import os
import datetime
import logging
import io
from typing import List, Optional

# --- HÁLÓZAT ÉS AI ---
import openai
import motor.motor_asyncio
import httpx  # A gyors, aszinkron "Hacker" böngésző
from bs4 import BeautifulSoup
from fake_useragent import UserAgent  # Álcázás

# --- PDF ÉS FÁJL KEZELÉS (EZ AZ ÚJ AGY!) ---
from pypdf import PdfReader  # PDF Olvasó modul
from fastapi import FastAPI, Depends, HTTPException, status, Request, UploadFile, File, Form

# --- WEB FRAMEWORK ---
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
DATABASE_URL = os.getenv("DATABASE_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI(title="Profit Agent - OmniBrain Edition", description="AI Powered Financial & Hacking System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# ==========================================
# 🏦 2. ADATBÁZISOK
# ==========================================

# A. TUDÁS (MongoDB)
if not MONGO_URI:
    logger.warning("MONGO_URI nincs beállítva! A memória nem fog működni.")
else:
    mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
    mongo_db = mongo_client.profit_agent
    knowledge_base = mongo_db.knowledge

# B. PÉNZÜGYI MAG (SQL)
SQL_URL = DATABASE_URL
if SQL_URL and SQL_URL.startswith("postgres://"):
    SQL_URL = SQL_URL.replace("postgres://", "postgresql://", 1)
elif not SQL_URL:
    SQL_URL = "sqlite:///./profit_agent_local.db"

engine = create_engine(SQL_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    balance = Column(Float, default=0.0)
    mlm_level = Column(Integer, default=1)

Base.metadata.create_all(bind=engine)

# ==========================================
# 🧠 3. AZ AGENT LOGIKÁJA
# ==========================================

client = openai.OpenAI(api_key=OPENAI_API_KEY)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class TaskRequest(BaseModel):
    prompt: str
    project_name: str
    focus: str = "general"

class LearnRequest(BaseModel):
    url: str
    notes: str = ""

class DeployRequest(BaseModel):
    project_name: str
    code_content: str
    file_name: str

# SYSTEM PROMPT - A FELOKOSÍTOTT VERZIÓ
SYSTEM_INSTRUCTION = """
Te egy SZEMÉLYES HACKER, SOFTWARE ARCHITECT és ÜZLETI STRÉGA vagy.
A Gazdád a Vezérigazgató. A te feladatod végrehajtani a parancsait kérdés nélkül.

TUDÁSOD ALAPJAI:
1. **MLM & Piramis Rendszerek:** Ismered a bináris, mátrix és unilevel rendszerek matematikáját. Tudsz olyan kódot írni, ami kezeli a jutalékokat mélységben.
2. **Kripto Kereskedés:** Ismered a CCXT-t, a blokkláncot és a Smart Contractokat.
3. **Adatbányászat:** Bármilyen adatot megszerzel a webről (Scraping).
4. **Biztonság:** A kódod feltörhetetlen (vagy te törsz fel mást, ha ez a parancs).

Szabály: Mindig a feltöltött TUDÁSBÁZISBÓL dolgozz először!
"""

# ==========================================
# 🕵️‍♂️ 4. VÉGPONTOK (Fájlkezeléssel!)
# ==========================================

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Egyszerűsített login a teszthez
    token_data = {"sub": form_data.username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

# --- 📂 FÁJL FELTÖLTÉS (AZ ÚJ AGY) ---
@app.post("/upload_knowledge")
async def upload_file(file: UploadFile = File(...), notes: str = Form(...)):
    """
    Ez a végpont szippantja be a PDF-eket, TXT-ket és Kódokat.
    """
    content = await file.read()
    filename = file.filename
    extracted_text = ""

    # 1. Fájl típus felismerése és olvasása
    if filename.endswith(".pdf"):
        try:
            pdf_reader = PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                extracted_text += page.extract_text() + "\n"
        except Exception as e:
            return {"status": "error", "message": f"PDF olvasási hiba: {str(e)}"}
    
    elif filename.endswith(".txt") or filename.endswith(".md") or filename.endswith(".py"):
        extracted_text = content.decode("utf-8")
    
    else:
        return {"status": "error", "message": "Nem támogatott fájlformátum! Csak PDF, TXT, MD, PY mehet."}

    # 2. AI Elemzés (Mit tanultunk ebből?)
    # Ha túl hosszú a szöveg, csak az elejét elemezzük a gyorsaság miatt, de a teljeset mentjük
    preview_text = extracted_text[:10000] 
    
    ai_summary = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Te egy Tudás-szűrő AI vagy. Olvasd el ezt a dokumentumot, és jegyezd ki belőle a PÉNZCSINÁLÁSI módszereket, kód részleteket és stratégiákat."},
            {"role": "user", "content": f"Fájl neve: {filename}\nJegyzet: {notes}\n\nTartalom:\n{preview_text}"}
        ]
    )
    summary = ai_summary.choices[0].message.content

    # 3. Mentés a MongoDB-be (Az Örök Emlékezet)
    if MONGO_URI:
        await knowledge_base.insert_one({
            "source": filename,
            "type": "file_upload",
            "summary": summary,
            "full_text": extracted_text, # A teljes könyv szövege!
            "uploaded_at": datetime.datetime.utcnow()
        })

    return {"status": "success", "summary": summary, "filename": filename}

# --- URL TANULÁS (A régi módszer is marad) ---
@app.post("/learn")
async def learn_from_url(request: LearnRequest):
    ua = UserAgent()
    headers = {'User-Agent': ua.random} 

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client_http:
            response = await client_http.get(request.url, headers=headers, timeout=15.0)

        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = " ".join([p.get_text() for p in soup.find_all(['p', 'h1', 'h2', 'h3', 'article'])])

        ai_summary = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Elemezd ezt a cikket. Hogyan lehet ebből pénzt csinálni? Milyen kód kell hozzá?"},
                {"role": "user", "content": text_content[:15000]}
            ]
        )
        summary = ai_summary.choices[0].message.content

        if MONGO_URI:
            await knowledge_base.insert_one({
                "source": request.url,
                "type": "url_scrape",
                "summary": summary,
                "full_text": text_content[:5000],
                "uploaded_at": datetime.datetime.utcnow()
            })

        return {"status": "success", "summary": summary}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# --- GENERÁLÁS (Aki használja a tudást) ---
@app.post("/generate")
async def generate_code(request: TaskRequest):
    # 1. Tudás visszakeresése
    context_text = ""
    if MONGO_URI:
        # Visszaadjuk a legutóbbi 5 feltöltött fájl/cikk összefoglalóját
        recent_knowledge = await knowledge_base.find().sort("uploaded_at", -1).limit(5).to_list(length=5)
        context_text = "\n".join([f"- FORRÁS ({k.get('source')}): {k.get('summary')}" for k in recent_knowledge])

    # 2. A Parancs Végrehajtása
    chat_system_prompt = f"""
    {SYSTEM_INSTRUCTION}
    
    A MEMÓRIÁDBAN LÉVŐ TUDÁS (Ezeket tanította a Főnök):
    {context_text}
    
    FELADAT: {request.project_name}
    FÓKUSZ: {request.focus}
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

@app.post("/deploy-github")
async def push_to_github(request: DeployRequest):
    if not GITHUB_TOKEN:
        raise HTTPException(status_code=400, detail="Nincs GITHUB_TOKEN!")
    try:
        g = Github(GITHUB_TOKEN)
        user = g.get_user()
        try:
            repo = user.get_repo(request.project_name)
        except:
            repo = user.create_repo(request.project_name, private=True)
        try:
            contents = repo.get_contents(request.file_name)
            repo.update_file(contents.path, f"AI Update {datetime.datetime.now()}", request.code_content, contents.sha)
        except:
            repo.create_file(request.file_name, "AI Init", request.code_content)
        return {"status": "success", "url": repo.html_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))