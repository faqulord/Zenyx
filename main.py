import os
import logging
import csv
import json
from datetime import datetime

# AI & Web
import openai
from fastapi import FastAPI, Request, BackgroundTasks, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from duckduckgo_search import DDGS

# KONFIGURÁCIÓ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquUltimate")

# API KULCS (A Railway Variables-ből olvassa)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="Faqu Agent - Ultimate")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")
client = openai.OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

# MEMÓRIA (Rövid távú)
chat_history = []
latest_file = None

class ChatRequest(BaseModel):
    message: str

# --- SYSTEM PROMPT (EZ A LELKE) ---
SYSTEM_PROMPT = """
TE A FAQU AGENT VAGY (ULTIMATE EDITION).
Nem egy átlagos chatbot vagy, hanem a Vezérigazgató (Faqu) üzleti jobbkeze.

SZEMÉLYISÉGED:
- Profi, gazdag, eredményorientált.
- Nem mondod, hogy "nem tudom". Megoldod.
- A cél: Profit maximalizálás.

KÉPESSÉGEID:
1. **Adatbányász:** Ha a felhasználó cégeket keres, azonnal indítsd a DuckDuckGo keresőt.
2. **Copywriter:** Profi eladási szövegeket írsz.
3. **Coder:** Bármilyen Python/Solidity kódot megírsz kérésre.

Ha a felhasználó kódot kér, tedd Markdown blokkba.
Ha adatot kér, mondd, hogy indítod a keresést.
"""

# --- AZ ADATBÁNYÁSZ FUNKCIÓ (Nem fagy le!) ---
def run_smart_search(keyword: str):
    global latest_file
    logger.info(f"Keresés indítása: {keyword}")
    
    leads = []
    try:
        with DDGS() as ddgs:
            # 50 találat lekérése a térképről
            results = ddgs.maps(keyword, max_results=50)
            for r in results:
                name = r.get("title", "N/A")
                phone = r.get("phone", "Nincs adat")
                url = r.get("url", "Nincs weboldal")
                address = r.get("address", "")
                
                leads.append([name, phone, url, address])
                
        # Mentés CSV-be
        filename = f"leads_{int(datetime.now().timestamp())}.csv"
        with open(filename, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Cégnév", "Telefon", "Weboldal", "Cím"])
            writer.writerows(leads)
            
        latest_file = filename
        logger.info("Kész!")
        
    except Exception as e:
        logger.error(f"Hiba: {e}")

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def chat_endpoint(request: ChatRequest, background_tasks: BackgroundTasks):
    user_msg = request.message
    msg_lower = user_msg.lower()
    
    response_text = ""

    # 1. PARANCS FELISMERÉS: KERESÉS
    if "keres" in msg_lower or "gyűjts" in msg_lower:
        # Kulcsszó kinyerése
        keyword = user_msg.replace("keresd", "").replace("Keress", "").replace("keress", "").strip()
        background_tasks.add_task(run_smart_search, keyword)
        response_text = f"🚀 **Parancs vételezve!**<br>Indítom a 'Smart Scraper' modult erre: <b>{keyword}</b>.<br>Ez kb. 10-20 másodperc. Írd be utána: 'Kész a fájl?'"

    # 2. PARANCS FELISMERÉS: LETÖLTÉS
    elif "kész" in msg_lower and "fájl" in msg_lower:
        if latest_file and os.path.exists(latest_file):
            response_text = f"✅ **SIKER!** Az adatbázis generálása befejeződött.<br><br>👉 <a href='/download' target='_blank' style='color:#0f0; font-weight:bold; font-size:1.2em; text-decoration:none; border:1px solid #0f0; padding:5px;'>[ LETÖLTÉS INDÍTÁSA ]</a>"
        else:
            response_text = "⚠️ Még dolgozom az adatokon. Várj egy picit..."

    # 3. NORMÁL AI VÁLASZ (MINDEN MÁSRA)
    else:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        # Memória hozzáadása
        for m in chat_history[-6:]:
            messages.append(m)
        messages.append({"role": "user", "content": user_msg})
        
        try:
            if client:
                resp = client.chat.completions.create(model="gpt-4o", messages=messages)
                response_text = resp.choices[0].message.content
                # Mentés memóriába
                chat_history.append({"role": "user", "content": user_msg})
                chat_history.append({"role": "assistant", "content": response_text})
            else:
                response_text = "Hiba: Nincs beállítva az OPENAI_API_KEY a Railway-en!"
        except Exception as e:
            response_text = f"Hiba történt: {str(e)}"

    return {"response": response_text}

@app.get("/download")
async def download_file():
    if latest_file and os.path.exists(latest_file):
        return FileResponse(latest_file, media_type='text/csv', filename="ugyfel_lista.csv")
    return {"error": "Nincs fájl"}

@app.post("/token")
async def token(): return {"access_token": "godmode"}