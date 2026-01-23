import os
import logging
import csv
import time
from typing import List

# AI & Server
import openai
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# SCRAPER ESZKÖZÖK (Ez az új rész!)
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

# KONFIGURÁCIÓ
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaquAgent")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI(title="Faqu Agent - Lead Hunter Edition")

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
latest_lead_file = None # Itt tároljuk a legutóbbi fájl nevét

class ChatRequest(BaseModel):
    message: str

# --- A PÉNZCSINÁLÓ MOTOR (LEAD HUNTER) ---
def run_scraper(search_term: str):
    """Ez a funkció fut a háttérben és gyűjti az adatokat"""
    logger.info(f"Scraper indítása erre: {search_term}")
    global latest_lead_file
    
    chrome_options = Options()
    chrome_options.add_argument('--headless') # Rejtett mód
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    driver = None
    leads = []
    
    try:
        # Automatikus Chrome Driver telepítés
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Google Maps (Egyszerűsített URL a sebességért)
        driver.get(f'https://www.google.com/maps/search/{search_term}')
        time.sleep(3) 

        # Görgetés (hogy több találat legyen)
        for _ in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)

        # Adatok kinyerése (Class nevek változhatnak, ezért általánosabb keresést használunk)
        # Ez egy egyszerűsített scraper logika a stabilitásért
        elements = driver.find_elements(By.CSS_SELECTOR, "div[role='article']")
        
        for el in elements[:20]: # Max 20 találat demónak
            try:
                text_content = el.text.split('\n')
                name = text_content[0] if len(text_content) > 0 else "N/A"
                # Próbálunk telefonszám formátumot keresni a szövegben
                phone = next((s for s in text_content if "+36" in s or "06" in s), "Nincs megadva")
                leads.append([name, phone, search_term])
            except:
                continue

        # Mentés CSV-be
        filename = "leads.csv"
        with open(filename, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Cég Neve', 'Telefon / Infó', 'Kulcsszó'])
            writer.writerows(leads)
        
        latest_lead_file = filename
        logger.info("Scraping kész!")

    except Exception as e:
        logger.error(f"Hiba a scraperben: {e}")
    finally:
        if driver:
            driver.quit()

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
    
    # KULCSSZÓ FIGYELÉS: Ha azt mondod "Keress", elindítja a robotot
    if "keress" in user_msg.lower() or "gyűjts" in user_msg.lower():
        # Kiszedjük a kulcsszót (pl. "Keress fogorvosokat")
        keyword = user_msg.replace("Keress", "").replace("gyűjts", "").strip()
        background_tasks.add_task(run_scraper, keyword)
        response_text = f"✅ Értettem, Főnök! A háttérben elindítottam az adatgyűjtést erre: '{keyword}'.\nEz eltarthat 1-2 percig. Írd be később: 'Kész a fájl?'"
    
    elif "kész a fájl" in user_msg.lower():
        if latest_lead_file:
             response_text = f"📂 IGEN! Az adatok készen állnak.<br><a href='/download_leads' target='_blank' style='color:#00ff00; font-weight:bold;'>[ KATTINTS IDE A LETÖLTÉSHEZ ]</a>"
        else:
            response_text = "⚠️ Még dolgozom rajta, vagy nem indítottál keresést."
            
    else:
        # Normál AI válasz
        messages = [{"role": "system", "content": "Te vagy a Lead Hunter Agent. Rövid, profi válaszokat adsz."}]
        messages.append({"role": "user", "content": user_msg})
        try:
            if OPENAI_API_KEY:
                ai_resp = client.chat.completions.create(model="gpt-4o", messages=messages)
                response_text = ai_resp.choices[0].message.content
            else:
                response_text = "Nincs OpenAI kulcs, de a Scraper működik!"
        except Exception as e:
            response_text = f"Hiba: {e}"

    return {"response": response_text}

@app.get("/download_leads")
async def download_leads():
    if latest_lead_file and os.path.exists(latest_lead_file):
        return FileResponse(latest_lead_file, media_type='text/csv', filename="ugyfel_lista.csv")
    return {"error": "Nincs elérhető fájl."}

@app.post("/deploy")
async def deploy_stub(request: Request):
    return {"status": "success", "url": "https://github.com/faqu-empire/lead-hunter"}