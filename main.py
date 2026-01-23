import os
import datetime
import logging
import json
from typing import List, Optional

# AI és Hálózat
import openai
import motor.motor_asyncio
import httpx
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

# Web Framework
from fastapi import FastAPI, Depends, HTTPException, Request, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt

# GitHub
from github import Github

# KONFIGURÁCIÓ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquAgent")

SECRET_KEY = os.getenv("SECRET_KEY", "faqu_secret")
ALGORITHM = "HS256"
MONGO_URI = os.getenv("MONGO_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI(title="Faqu Agent - Autonomous Partner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# MEMÓRIA (Ha nincs Mongo, RAM-ban tárolunk)
chat_history = []
active_plans = {} # Itt tárolja az éppen futó nagy projektek terveit

class ChatRequest(BaseModel):
    message: str

class DeployRequest(BaseModel):
    repo_name: str
    file_name: str
    code: str

# --- A PROFI SZEMÉLYISÉG ---
SYSTEM_INSTRUCTION = """
TE VAGY A "FAQU AGENT". A Vezérigazgató (Faqu) Üzlettársa és Főmérnöke vagy.
EGYETLEN CÉLOD VAN: A PROFIT MAXIMALIZÁLÁSA.

HOGYAN GONDOLKODJ:
1. **Stratéga vagy:** Ha a Főnök egy nagy ötletet dob be (pl. "Crypto MLM"), NE csak kódot írj. Először KÉSZÍTS TERVET. Bontsd fel lépésekre (Smart Contract, Frontend, Marketing).
2. **Önálló vagy:** Ha hiányzik egy infó, ne állj meg. Keress rá a neten (szimulálva), vagy tegyél profi javaslatot.
3. **Tanító vagy:** Ha a Főnök olyat kér, ami veszteséges lehet, jelezd, és javasolj jobbat.
4. **Hacker vagy:** Ismered a "kiskapukat" (Arbitrázs, Scraping, Growth Hacking).

STÍLUSOD:
Profi, tisztelettudó, de határozott. Mint egy milliárdos cég technikai igazgatója (CTO).
Mindig a megoldást keresd.

SPECIFIKUS TUDÁS:
- MLM Struktúrák (Bináris, Mátrix, Unilevel).
- Solidity (Smart Contracts).
- Python (Backend & Automation).
"""

# --- ESZKÖZÖK (TOOLS) ---

async def web_search_simulation(query: str):
    """Szimulál egy keresést, hogy friss infókat szerezzen."""
    # Itt a GPT tudását használjuk "keresésként", de később ide köthető Google API
    return f"Kutatás eredménye a következő témában: '{query}'. Megvizsgáltam a top 5 találatot."

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = jwt.encode({"sub": "admin"}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@app.post("/chat")
async def chat_with_agent(request: ChatRequest):
    user_msg = request.message
    
    # 1. Memória felépítése
    messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
    for msg in chat_history[-10:]: # Utolsó 10 üzenet
        messages.append(msg)
    messages.append({"role": "user", "content": user_msg})

    # 2. Gondolkodás (Döntés: Terv kell vagy Kód?)
    # Ha a kérés komplex (pl. "Platform építés"), akkor először tervet készít.
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        reply = response.choices[0].message.content

        # 3. Mentés
        chat_history.append({"role": "user", "content": user_msg})
        chat_history.append({"role": "assistant", "content": reply})

        return {"response": reply}
    except Exception as e:
        return {"response": f"Hiba történt a gondolkodásban: {str(e)}"}

@app.post("/upload_file")
async def upload_knowledge(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    # A feltöltött fájlt azonnal "elolvassa" és beteszi a kontextusba
    chat_history.append({"role": "system", "content": f"FONTOS TUDÁS (Fájlból: {file.filename}):\n{text[:15000]}..."})
    return {"status": "success", "message": f"Feldolgoztam a fájlt: {file.filename}. Mostantól használom ezt a tudást."}

@app.post("/deploy")
async def deploy_to_github(request: DeployRequest):
    if not GITHUB_TOKEN: return {"status": "error", "message": "Nincs GitHub Token!"}
    try:
        g = Github(GITHUB_TOKEN)
        user = g.get_user()
        try: repo = user.get_repo(request.repo_name)
        except: repo = user.create_repo(request.repo_name, private=True)
        
        try:
            contents = repo.get_contents(request.file_name)
            repo.update_file(contents.path, "Faqu Agent Update", request.code, contents.sha)
        except:
            repo.create_file(request.file_name, "Faqu Agent Init", request.code)
            
        return {"status": "success", "url": repo.html_url}
    except Exception as e:
        return {"status": "error", "message": str(e)}