require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { Telegraf } = require('telegraf');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

// --- KONFIGURÁCIÓ ---
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adminBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const supportBot = new Telegraf(process.env.TELEGRAM_ANNA_BOT_TOKEN); // Ő lesz "Zeta"
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OWNER_ID = process.env.TELEGRAM_OWNER_CHAT_ID;

// --- ZENYX ÜZLETI LOGIKA ---
const TIERS = {
    1: { cost: 50, daily: 1.66 },
    2: { cost: 100, daily: 3.33 },
    3: { cost: 500, daily: 16.65 },
    4: { cost: 1000, daily: 33.30 },
    5: { cost: 5000, daily: 166.50 }
};

// --- ADMIN BOT (Értesítések neked) ---
async function notifyOwner(message) {
    try { await adminBot.telegram.sendMessage(OWNER_ID, `🚨 <b>ZENYX ADMIN ALERT</b>\n\n${message}`, { parse_mode: 'HTML' }); }
    catch (e) { console.error("Admin bot hiba:", e); }
}

// --- ZETA AI (Support Bot) ---
supportBot.on('text', async (ctx) => {
    const userMsg = ctx.message.text;
    
    // AI Személyiség: ZETA (Futurisztikus Pénzügyi Tanácsadó)
    const systemPrompt = `
        A neved ZETA. A Zenyx Platform mesterséges intelligenciája vagy.
        Stílusod: Profi, futurisztikus, rövid, pénz-orientált.
        Célod: Rávenni az embereket, hogy vegyenek nagyobb "Zenyx Node"-ot (bányászgépet).
        Ha kérdezik:
        - Hétvégén a profit 50%, mert a piac pihen.
        - Napi 3 klikkelés kell a profit jóváírásához.
        - Kifizetés: Min 20 USDT, 10% kezelési költség.
    `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userMsg }],
            model: "gpt-4",
        });
        ctx.reply(completion.choices[0].message.content);
    } catch (e) {
        ctx.reply("Rendszerhiba. Kérlek próbáld később.");
    }
});

// --- API VÉGPONTOK (A Weboldalnak) ---

// 1. BÁNYÁSZAT (KLIKKELÉS)
app.post('/api/mine', async (req, res) => {
    const { userId } = req.body;
    
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        
        if (user.rows.length === 0) return res.status(404).json({ error: "User nem található" });
        const u = user.rows[0];

        // Ellenőrzés: Van-e VIP szintje?
        if (u.vip_level === 0) return res.status(400).json({ error: "Nincs aktív Zenyx Node-od! Vásárolj egyet." });

        // Ellenőrzés: Klikkelt-e már ma 3x?
        if (u.clicks_today >= 3) return res.status(400).json({ error: "Mára végeztél a munkával!" });

        // PROFIT SZÁMÍTÁS
        let dailyProfit = TIERS[u.vip_level].daily;
        
        // Hétvégi Felezés Logic
        const today = new Date();
        const day = today.getDay(); // 0 = Vasárnap, 6 = Szombat
        if (day === 0 || day === 6) {
            dailyProfit = dailyProfit / 2; // 50% csökkentés
        }

        const profitPerClick = dailyProfit / 3;

        // Jóváírás
        await client.query('UPDATE users SET balance = balance + $1, clicks_today = clicks_today + 1 WHERE id = $2', [profitPerClick, userId]);
        
        res.json({ message: `Siker! Jóváírva: $${profitPerClick.toFixed(2)}`, newBalance: u.balance + profitPerClick });
        client.release();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 2. KIFIZETÉS (WITHDRAW)
app.post('/api/withdraw', async (req, res) => {
    const { userId, amount, wallet } = req.body;

    // IDŐZÓNA ELLENŐRZÉS (Hétfő-Péntek 10-19 GMT)
    const now = new Date();
    const day = now.getUTCDay();
    const hour = now.getUTCHours();

    if (day === 0 || day === 6) return res.status(400).json({ error: "Kifizetés csak munkanapokon!" });
    if (hour < 10 || hour >= 19) return res.status(400).json({ error: "A pénzügyi osztály 10:00 és 19:00 (GMT) között dolgozik." });

    if (amount < 20) return res.status(400).json({ error: "Minimum kifizetés: 20 USDT" });

    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        
        if (user.rows[0].balance < amount) return res.status(400).json({ error: "Nincs elég fedezet!" });

        // 10% SÁP LEVONÁSA
        const fee = amount * 0.10;
        const finalAmount = amount - fee;

        // Tranzakció mentése "pending" státusszal
        await client.query('INSERT INTO transactions (user_id, type, amount, status) VALUES ($1, $2, $3, $4)', [userId, 'withdraw', amount, 'pending']);
        
        // Egyenleg levonása
        await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [amount, userId]);

        // ÉRTESÍTÉS NEKED (OWNER)
        notifyOwner(`💰 <b>ÚJ KIFIZETÉSI KÉRELEM!</b>\n\nUser: ${user.rows[0].username}\nKért összeg: ${amount} USDT\nKifizetendő (90%): <b>${finalAmount} USDT</b>\nTárca: ${wallet}\n\n👉 Menj az Admin Panelre jóváhagyni!`);

        res.json({ message: "Kifizetési kérelem fogadva. Az admin hamarosan jóváhagyja." });
        client.release();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ZENYX ENGINE RUNNING ON PORT ${PORT}`);
    adminBot.launch();
    supportBot.launch();
});