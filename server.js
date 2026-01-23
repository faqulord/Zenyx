require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { Telegraf } = require('telegraf');
const OpenAI = require('openai');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Botok inicializálása (hiba esetén nem áll le a szerver)
const adminBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const supportBot = new Telegraf(process.env.TELEGRAM_ANNA_BOT_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OWNER_ID = process.env.TELEGRAM_OWNER_CHAT_ID;

// --- ZENYX ÜZLETI CSOMAGOK ---
const TIERS = {
    1: { name: "Start Node", cost: 50, daily: 1.66 },
    2: { name: "Advanced Node", cost: 100, daily: 3.33 },
    3: { name: "Pro Node", cost: 500, daily: 16.65 },
    4: { name: "Business Node", cost: 1000, daily: 33.30 },
    5: { name: "Enterprise Node", cost: 5000, daily: 166.50 }
};

// --- ADMIN API ---
// 1. ADMIN LOGIN (Hardcoded a biztonság kedvéért a Te adataiddal)
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // A SkyHigh dokumentáció szerinti adatok:
    if (username === 'admin' && password === 'admin1337') {
        res.json({ success: true, token: 'secret-admin-token' });
    } else {
        res.status(401).json({ error: "Hozzáférés megtagadva. IP cím naplózva." });
    }
});

// 2. USER LISTA (Admin Dashboardnak)
app.get('/api/admin/users', async (req, res) => {
    try {
        const client = await pool.connect();
        const users = await client.query('SELECT id, username, balance, vip_level, referrer, joined_at FROM users ORDER BY joined_at DESC');
        client.release();
        res.json(users.rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- USER API ---

// 3. CSOMAG VÁSÁRLÁS (Upgrade)
app.post('/api/buy-node', async (req, res) => {
    const { userId, tier } = req.body;
    const pack = TIERS[tier];
    
    try {
        const client = await pool.connect();
        const userRes = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userRes.rows[0];

        if (user.balance < pack.cost) {
            return res.status(400).json({ error: `Nincs elég fedezet! Ár: $${pack.cost}, Egyenleged: $${user.balance}` });
        }

        // Pénz levonása + Szint emelése
        await client.query('UPDATE users SET balance = balance - $1, vip_level = $2 WHERE id = $3', [pack.cost, tier, userId]);
        
        // MLM JUTALÉK (Egyszerűsített: 10% a meghívónak)
        if (user.referrer) {
            const commission = pack.cost * 0.10; // 10% jutalék
            await client.query('UPDATE users SET balance = balance + $1 WHERE username = $2', [commission, user.referrer]);
            console.log(`Jutalék ($${commission}) jóváírva neki: ${user.referrer}`);
        }

        res.json({ success: true, message: `${pack.name} sikeresen aktiválva!` });
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 4. REGISZTRÁCIÓ (Javított)
app.post('/api/register', async (req, res) => {
    const { username, password, refCode } = req.body;
    try {
        const client = await pool.connect();
        // Ellenőrizzük, hogy létezik-e a meghívó (ha van kód)
        let finalRef = null;
        if (refCode) {
            const refCheck = await client.query('SELECT username FROM users WHERE username = $1', [refCode]);
            if (refCheck.rows.length > 0) finalRef = refCode;
        }

        const newUser = await client.query(
            'INSERT INTO users (username, telegram_id, balance, vip_level, referrer) VALUES ($1, $2, 0, 0, $3) RETURNING *',
            [username, password, finalRef]
        );

        // ÉRTESÍTÉS TELEGRAMON NEKED
        try {
            adminBot.telegram.sendMessage(OWNER_ID, `🚀 <b>ÚJ ZENYX REGISZTRÁCIÓ!</b>\n\nNév: ${username}\nMeghívó: ${finalRef || "Nincs"}\n\nLépj be az Admin Panelbe!`, { parse_mode: 'HTML' });
        } catch (err) { console.log("Bot hiba (nem kritikus)"); }

        res.json({ success: true, user: newUser.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: "A felhasználónév foglalt!" }); }
});

// ... (A LOGIN és BÁNYÁSZAT endpointok maradnak a régiek) ...
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE username = $1 AND telegram_id = $2', [username, password]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Hibás adatok!" });
        res.json({ success: true, user: user.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.json(user.rows[0]);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/mine', async (req, res) => {
    const { userId } = req.body;
    try {
        const client = await pool.connect();
        const uRes = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        const u = uRes.rows[0];
        
        if (u.vip_level === 0) return res.status(400).json({ error: "Nincs aktív géped!" });
        if (u.clicks_today >= 3) return res.status(400).json({ error: "Mára kész vagy!" });

        let profit = TIERS[u.vip_level].daily / 3;
        const day = new Date().getDay();
        if (day === 0 || day === 6) profit = profit / 2; // Hétvége

        await client.query('UPDATE users SET balance = balance + $1, clicks_today = clicks_today + 1 WHERE id = $2', [profit, userId]);
        res.json({ message: "Siker!", newBalance: u.balance + profit });
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ZENYX ENTERPRISE ONLINE ON PORT ${PORT}`);
    try { adminBot.launch(); supportBot.launch(); } catch(e) {}
});