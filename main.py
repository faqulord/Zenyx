import os
import logging
import csv
import time
from typing import List

# AI & Szerver
import openai
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ÚJ SCRAPER MOTOR (DuckDuckGo - Stabil és Gyors)
from duckduckgo_search import DDGS

# KONFIGURÁCIÓ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquAgent")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="Faqu Agent - Lead Hunter Pro")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")
client = openai.OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

# MEMÓRIA
chat_history = []
latest_lead_file = None 

class ChatRequest(BaseModel):
    message: str

# --- A STABIL ADATBÁNYÁSZ MOTOR ---
def run_scraper(search_term: str):
    """Ez a funkció gyűjti az adatokat a DuckDuckGo Maps-ről"""
    logger.info(f"Keresés indítása: {search_term}")
    global latest_lead_file
    
    leads = []
    
    try:
        # Itt használjuk a DDGS Maps keresőt - Ez nem fagy le!
        with DDGS() as ddgs:
            # Lehúzunk 50 találatot a térképről
            results = ddgs.maps(search_term, max_results=50)
            
            for r in results:
                name = r.get('title', 'N/A')
                address = r.get('address', 'Nincs cím')
                phone = r.get('phone', 'Nincs megadva')
                website = r.get('url', 'Nincs weboldal')
                
                # Csak azokat mentjük, ami hasznos lehet
                leads.append([name, phone, website, address])

        # Mentés CSV-be
        filename = "leads.csv"
        with open(filename, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Cég Neve', 'Telefonszám', 'Weboldal', 'Cím'])
            writer.writerows(leads)
        
        latest_lead_file = filename
        logger.info(f"Kész! {len(leads)} cég mentve.")

    except Exception as e:
        logger.error(f"Hiba a scraperben: {e}")

# --- VÉGPONTOK ---

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/token")
async def login():
    return {"access_token": "admin", "token_type": "bearer"}

@app.post("/chat")
async def chat_with_agent(request: ChatRequest, background_tasks: BackgroundTasks):
    user_msg = request.message
    response_text = ""
    
    # KULCSSZÓ FIGYELÉS (Kis/Nagybetű nem számít)
    msg_lower = user_msg.lower()

    if "keres" in msg_lower or "gyűjts" in msg_lower:
        # Kiszedjük a kulcsszót (bármi ami a parancs után van)
        keyword = user_msg.replace("keresd", "").replace("Keress", "").replace("keress", "").strip()
        
        background_tasks.add_task(run_scraper, keyword)
        response_text = f"✅ Vettem! A DuckDuckGo radarral keresem ezt: '{keyword}'.<br>Ez sokkal gyorsabb lesz. Várj kb. 10 másodpercet, majd írd be: 'Kész?'"
    
    elif "kész" in msg_lower and "fájl" in msg_lower:
        if latest_lead_file and os.path.exists(latest_lead_file):
             response_text = f"📂 <b>SIKER!</b> Az adatbázis elkészült.<br><br>👉 <a href='/download_leads' target='_blank' style='color:#00ff00; font-weight:bold; font-size:1.2em;'>[ KATTINTS IDE A LETÖLTÉSHEZ ]</a>"
        else:
            response_text = "⚠️ Még dolgozom (vagy üres volt a találat). Próbáld újra 10 mp múlva!"
            
    else:
        # Normál AI válasz
        messages = [{"role": "system", "content": "Te vagy a Lead Hunter Agent. Rövid, profi válaszokat adsz."}]
        messages.append({"role": "user", "content": user_msg})
        try:
            if OPENAI_API_KEY:
                ai_resp = client.chat.completions.create(model="gpt-4o", messages=messages)
                response_text = ai_resp.choices[0].message.content
            else:
                response_text = "Adatbányász mód aktív. Írd be: 'Keress fogorvosokat'!"
        except:
            response_text = "Hiba az AI kapcsolatban."

    return {"response": response_text}

@app.get("/download_leads")
async def download_leads():
    if latest_lead_file and os.path.exists(latest_lead_file):
        return FileResponse(latest_lead_file, media_type='text/csv', filename="ugyfel_lista.csv")
    return {"error": "Nincs elérhető fájl."}