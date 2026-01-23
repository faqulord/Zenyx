import os
import logging
from typing import List

# AI
import openai
import motor.motor_asyncio

# Web Framework
from fastapi import FastAPI, Request, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# KONFIGURÁCIÓ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquAgent")

# Ha nincs kulcs, nem száll el, csak jelez
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI(title="Faqu Agent - Stable Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# Ellenőrzés
if not OPENAI_API_KEY:
    logger.error("NINCS OPENAI API KEY BEÁLLÍTVA!")
else:
    client = openai.OpenAI(api_key=OPENAI_API_KEY)

# MEMÓRIA (RAM alapú, ha nincs Mongo)
local_memory = []

class ChatRequest(BaseModel):
    message: str

# SYSTEM PROMPT
SYSTEM_INSTRUCTION = """
TE VAGY A FAQU AGENT. A Vezérigazgató (Faqu) digitális társa.
CÉL: Pénzcsinálás kódolással és stratégiával.

STÍLUS:
- Rövid, profi, lényegretörő.
- Python és Solidity szakértő vagy.
- Bármit meg tudsz írni a tudásod alapján.

Ha a felhasználó kódot kér, add meg a teljes kódot Markdown blokkban.
"""

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login():
    # Egyszerűsített belépés, hogy ne ezen csússzon el
    return {"access_token": "admin-token", "token_type": "bearer"}

@app.post("/chat")
async def chat_with_agent(request: ChatRequest):
    if not OPENAI_API_KEY:
        return {"response": "HIBA: Nincs beállítva az OPENAI_API_KEY a Railway-en!"}

    user_msg = request.message
    
    # Memória építése
    messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
    
    # Hozzáadjuk az előzményeket
    for msg in local_memory[-6:]:
        messages.append(msg)
    
    messages.append({"role": "user", "content": user_msg})

    try:
        # Itt hívjuk a GPT-t. Ez a legstabilabb pont.
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        reply = response.choices[0].message.content

        # Mentés
        local_memory.append({"role": "user", "content": user_msg})
        local_memory.append({"role": "assistant", "content": reply})

        return {"response": reply}

    except Exception as e:
        logger.error(f"OpenAI Hiba: {e}")
        return {"response": f"Kritikus hiba a generálásnál: {str(e)}"}

@app.post("/upload_file")
async def upload_knowledge(file: UploadFile = File(...)):
    try:
        content = await file.read()
        text = content.decode("utf-8", errors="ignore")
        local_memory.append({"role": "system", "content": f"FELTÖLTÖTT TUDÁS ({file.filename}):\n{text[:5000]}..."})
        return {"status": "success", "message": "Fájl beolvasva a memóriába."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/deploy")
async def deploy_stub(request: Request):
    return {"status": "success", "url": "https://github.com/faqu-empire/project"}