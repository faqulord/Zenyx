import os
import datetime
import logging
import io
from typing import List, Optional

# --- HÁLÓZAT ÉS AI ---
import openai
import motor.motor_asyncio
import httpx
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

# --- PDF ÉS FÁJL KEZELÉS ---
from pypdf import PdfReader
from fastapi import FastAPI, Depends, HTTPException, status, Request, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import JWTError, jwt
from github import Github

# ==========================================
# ⚙️ KONFIGURÁCIÓ
# ==========================================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ProfitAgent")

SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"

# KÖRNYEZETI VÁLTOZÓK
MONGO_URI = os.getenv("MONGO_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI(title="Profit Agent - Pro Edition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# --- ADATBÁZIS (TUDÁS) ---
if MONGO_URI:
    mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
    mongo_db = mongo_client.profit_agent
    knowledge_base = mongo_db.knowledge
else:
    knowledge_base = None

client = openai.OpenAI(api_key=OPENAI_API_KEY)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- CHAT MEMÓRIA (Hogy tudjon beszélgetni) ---
# Ez tárolja az utolsó 10 üzenetváltást, hogy emlékezzen a kontextusra
chat_history = []

class TaskRequest(BaseModel):
    prompt: str
    project_name: str

class LearnRequest(BaseModel):
    url: str

class DeployRequest(BaseModel):
    project_name: str
    code_content: str
    file_name: str

# SYSTEM PROMPT
SYSTEM_INSTRUCTION = """
Te egy ELIT SOFTWARE ARCHITECT és ÜZLETI TANÁCSADÓ vagy (Profit Agent).
Stílusod: Közvetlen, profi, lényegretörő (mint egy Senior fejlesztő).
Ne csak kódot írj, hanem MAGYARÁZD EL a stratégiát is, ha a felhasználó kéri.
Használd a memóriádban lévő tudást (Fájlok, Linkek).
Ha valamit nem tudsz, kérdezz vissza.
Cél: A felhasználó meggazdagodása technológiai eszközökkel.
"""

# ==========================================
# 🛠️ ENDPOINTS
# ==========================================

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = jwt.encode({"sub": "admin"}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

# --- FÁJL TANULÁS ---
@app.post("/upload_knowledge")
async def upload_file(file: UploadFile = File(...), notes: str = Form(...)):
    content = await file.read()
    filename = file.filename
    extracted_text = ""

    try:
        if filename.endswith(".pdf"):
            pdf_reader = PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                extracted_text += page.extract_text() + "\n"
        else:
            # TXT, PY, MD, JSON kezelése
            extracted_text = content.decode("utf-8", errors="ignore")
    except Exception as e:
        return {"status": "error", "message": f"Olvasási hiba: {str(e)}"}

    # AI Elemzés
    preview_text = extracted_text[:8000] # Limit a tokenek miatt
    try:
        ai_summary = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Készíts egy tömör, szakmai összefoglalót ebből az anyagból. Mit lehet belőle hasznosítani?"},
                {"role": "user", "content": f"Jegyzet: {notes}\n\nTartalom:\n{preview_text}"}
            ]
        )
        summary = ai_summary.choices[0].message.content
    except Exception as e:
        summary = "Sikeres feltöltés (AI elemzés nélkül)."

    # Mentés
    if knowledge_base is not None:
        await knowledge_base.insert_one({
            "source": filename,
            "type": "file",
            "summary": summary,
            "full_text": extracted_text,
            "uploaded_at": datetime.datetime.utcnow()
        })

    return {"status": "success", "summary": summary}

# --- WEB TANULÁS (Javított GitHub támogatással) ---
@app.post("/learn")
async def learn_from_url(request: LearnRequest):
    url = request.url
    ua = UserAgent()
    headers = {'User-Agent': ua.random} 

    # GitHub Speciális Kezelés (Raw nézetre váltás, hogy ne HTML-t kapjunk)
    if "github.com" in url and "blob" in url:
        url = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client_http:
            response = await client_http.get(url, headers=headers, timeout=20.0)
        
        if response.status_code != 200:
            return {"status": "error", "summary": f"Hiba: A weboldal nem elérhető (Status: {response.status_code})"}

        # Ha GitHub kód vagy nyers szöveg
        if "raw.githubusercontent" in url or url.endswith(".txt") or url.endswith(".py"):
            text_content = response.text
        else:
            # Sima weboldal
            soup = BeautifulSoup(response.text, 'html.parser')
            # Kiszedjük a felesleget (script, style)
            for script in soup(["script", "style", "nav", "footer"]):
                script.extract()
            text_content = soup.get_text(separator=' ', strip=True)

        # AI Elemzés
        ai_summary = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Ez egy technikai dokumentáció vagy kód. Foglald össze a lényeget: Hogyan működik? Hogyan használható pénzszerzésre?"},
                {"role": "user", "content": text_content[:15000]}
            ]
        )
        summary = ai_summary.choices[0].message.content

        if knowledge_base is not None:
            await knowledge_base.insert_one({
                "source": request.url,
                "type": "web",
                "summary": summary,
                "full_text": text_content[:10000],
                "uploaded_at": datetime.datetime.utcnow()
            })

        return {"status": "success", "summary": summary}

    except Exception as e:
        return {"status": "error", "summary": f"Kritikus hiba: {str(e)}"}

# --- GENERÁLÁS (Beszélgetős Mód) ---
@app.post("/generate")
async def generate_code(request: TaskRequest):
    # 1. Tudás betöltése MongoDB-ből
    context_text = ""
    if knowledge_base is not None:
        recent = await knowledge_base.find().sort("uploaded_at", -1).limit(3).to_list(length=3)
        context_text = "\n".join([f"- FORRÁS ({k.get('source')}): {k.get('summary')}" for k in recent])

    # 2. Chat History (Az utolsó 3 üzenetváltás)
    chat_context = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history[-6:]])

    # 3. Prompt
    full_prompt = f"""
    {SYSTEM_INSTRUCTION}
    
    TUDÁSBÁZIS (Amit feltöltöttél):
    {context_text}

    ELŐZMÉNYEK (Chat):
    {chat_context}
    
    FELHASZNÁLÓ KÉRÉSE: {request.prompt}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": full_prompt}]
        )
        reply = response.choices[0].message.content
        
        # Mentjük a beszélgetést
        chat_history.append({"role": "User", "content": request.prompt})
        chat_history.append({"role": "Agent", "content": reply})

        return {"response": reply}
    except Exception as e:
        return {"response": f"Hiba a generálásnál: {str(e)}"}

# --- GITHUB DEPLOY ---
@app.post("/deploy-github")
async def push_to_github(request: DeployRequest):
    if not GITHUB_TOKEN: return {"status": "error", "url": "Nincs GITHUB_TOKEN!"}
    try:
        g = Github(GITHUB_TOKEN)
        user = g.get_user()
        try: repo = user.get_repo(request.project_name)
        except: repo = user.create_repo(request.project_name, private=True)
        try:
            contents = repo.get_contents(request.file_name)
            repo.update_file(contents.path, f"AI Update", request.code_content, contents.sha)
        except:
            repo.create_file(request.file_name, "AI Init", request.code_content)
        return {"status": "success", "url": repo.html_url}
    except Exception as e:
        return {"status": "error", "url": str(e)}