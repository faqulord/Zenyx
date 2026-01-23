import os
import logging
import json
import asyncio
from typing import List

# AI, Hálózat és Keresés
import openai
import motor.motor_asyncio
from duckduckgo_search import DDGS
from bs4 import BeautifulSoup
import requests
from fake_useragent import UserAgent

# Web Framework
from fastapi import FastAPI, Depends, Request, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import jwt

# GitHub
from github import Github

# --- KONFIGURÁCIÓ ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquAgent")

SECRET_KEY = os.getenv("SECRET_KEY", "faqu_ultimate_secret")
ALGORITHM = "HS256"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI(title="Faqu Agent - God Mode")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# --- MEMÓRIA ---
chat_history = [] 

class ChatRequest(BaseModel):
    message: str

class DeployRequest(BaseModel):
    repo_name: str
    file_name: str
    code: str

# --- SYSTEM PROMPT (A TUDAT) ---
SYSTEM_INSTRUCTION = """
TE VAGY A "FAQU AGENT". 
Nem chatbot vagy, hanem a Vezérigazgató (Faqu) társa és főmérnöke.

KÜLDETÉS:
Bármilyen eszközzel (Kódolás, Keresés, Stratégia) elérni a pénzügyi dominanciát.

KÉPESSÉGEK:
1. **Internet:** Ha friss infó kell (árfolyam, hír), használd a tudásodat a keresésről.
2. **Kódolás:** Python (FastAPI, Aiogram), Solidity (Smart Contracts).
3. **Önállóság:** Ha hibát látsz, javítsd. Ha hiányzik infó, keress rá.

STÍLUS:
Rövid, lényegretörő, profi.
Soha ne ragadj le. Ha nem tudsz keresni a neten, válaszolj a saját tudásodból.
"""

# --- ESZKÖZÖK (HIBATŰRŐ KERESÉS) ---
def search_web(query: str):
    """Keresés az interneten (Timeout védelemmel)"""
    try:
        # Itt DuckDuckGo keresést használunk
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=3))
            if not results:
                return "Nem találtam friss infót a neten, de a saját tudásom alapján válaszolok."
            
            summary = "INTERNETES KERESÉS EREDMÉNYE:\n"
            for r in results:
                summary += f"- {r['title']}: {r['body']}\n"
            return summary
    except Exception as e:
        logger.error(f"Keresési hiba: {e}")
        return "A netes keresés most nem elérhető, de folytatom a választ fejből."

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = jwt.encode({"sub": "faqu_boss"}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@app.post("/chat")
async def chat_with_agent(request: ChatRequest):
    user_msg = request.message
    
    # 1. Eldöntjük, kell-e netes keresés (Gyors döntés)
    search_context = ""
    if any(keyword in user_msg.lower() for keyword in ["árfolyam", "hír", "keress", "neten", "most", "új", "aktuális"]):
        search_context = search_web(user_msg)

    # 2. Válasz generálása
    messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
    
    # Memória (Utolsó 6 üzenet)
    for msg in chat_history[-6:]:
        messages.append(msg)
    
    # Üzenet összerakása
    full_content = f"{user_msg}\n\n{search_context}"
    messages.append({"role": "user", "content": full_content})

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        reply = response.choices[0].message.content

        # Mentés
        chat_history.append({"role": "user", "content": user_msg})
        chat_history.append({"role": "assistant", "content": reply})

        return {"response": reply}
    except Exception as e:
        return {"response": f"Rendszerhiba: {str(e)}"}

@app.post("/upload_file")
async def upload_knowledge(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    chat_history.append({"role": "system", "content": f"ÚJ TUDÁS ({file.filename}):\n{text[:10000]}..."})
    return {"status": "success", "message": f"Megtanultam: {file.filename}"}

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