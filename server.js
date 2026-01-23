require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { Telegraf } = require('telegraf');
const OpenAI = require('openai');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// --- AUTOMATIKUS ADATBÁZIS ÉPÍTÉS (HIBAJAVÍTÓ) ---
async function initDB() {
    try {
        const client = await pool.connect();
        // Beolvassuk a schema.sql fájlt és lefuttatjuk
        const schema = fs.readFileSync('schema.sql', 'utf8');
        await client.query(schema);
        console.log("✅ ADATBÁZIS TÁBLÁK LÉTREHOZVA/ELLENŐRIZVE!");
        client.release();
    } catch (err) {
        console.error("❌ ADATBÁZIS HIBA:", err);
    }
}
initDB(); // Szerver indításakor lefut!

// --- BOTOK (Ha hibás a kulcs, nem omlik össze) ---
const adminBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const supportBot = new Telegraf(process.env.TELEGRAM_ANNA_BOT_TOKEN);
const OWNER_ID = process.env.TELEGRAM_OWNER_CHAT_ID;

// --- ÜZLETI LOGIKA ---
const TIERS = {
    1: { name: "Start Node", cost: 50, daily: 1.66 },
    2: { name: "Advanced Node", cost: 100, daily: 3.33 },
    3: { name: "Pro Node", cost: 500, daily: 16.65 },
    4: { name: "Business Node", cost: 1000, daily: 33.30 },
    5: { name: "Enterprise Node", cost: 5000, daily: 166.50 }
};

// --- API ---

// BELÉPÉS
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const client = await pool.connect();
        // Egyszerűsített login (password = telegram_id a példában)
        const user = await client.query('SELECT * FROM users WHERE username = $1 AND telegram_id = $2', [username, password]);
        
        if (user.rows.length === 0) return res.status(401).json({ error: "Hibás adatok vagy nincs fiók!" });
        
        res.json({ success: true, user: user.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// REGISZTRÁCIÓ
app.post('/api/register', async (req, res) => {
    const { username, password, refCode } = req.body;
    try {
        const client = await pool.connect();
        let finalRef = null;
        if (refCode) {
            const refCheck = await client.query('SELECT username FROM users WHERE username = $1', [refCode]);
            if (refCheck.rows.length > 0) finalRef = refCode;
        }

        const newUser = await client.query(
            'INSERT INTO users (username, telegram_id, balance, vip_level, referrer) VALUES ($1, $2, 0, 0, $3) RETURNING *',
            [username, password, finalRef]
        );
        
        // Értesítés neked
        try { adminBot.telegram.sendMessage(OWNER_ID, `🚀 ÚJ USER: ${username}`); } catch(e){}

        res.json({ success: true, user: newUser.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: "Ez a név már foglalt!" }); }
});

// ADATOK LEKÉRÉSE + CSOMAG VÉTEL
app.get('/api/user/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.json(user.rows[0]);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/buy-node', async (req, res) => {
    const { userId, tier } = req.body;
    const pack = TIERS[tier];
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (user.rows[0].balance < pack.cost) return res.status(400).json({error: "Nincs elég egyenleg!"});
        
        await client.query('UPDATE users SET balance = balance - $1, vip_level = $2 WHERE id = $3', [pack.cost, tier, userId]);
        res.json({success: true, message: "Sikeres vásárlás!"});
        client.release();
    } catch (e) { res.status(500).json({error: e.message}); }
});

// ADMIN API (User lista)
app.get('/api/admin/users', async (req, res) => {
    try {
        const client = await pool.connect();
        const users = await client.query('SELECT * FROM users ORDER BY id DESC');
        res.json(users.rows);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ZENYX SYSTEM ONLINE - PORT ${PORT}`);
    try { adminBot.launch(); supportBot.launch(); } catch(e){}
});