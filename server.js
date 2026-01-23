require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { Telegraf } = require('telegraf'); // Ha nem használod a botot, ezt kiveheted
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// DB INIT
async function initDB() {
    try {
        const client = await pool.connect();
        const schema = fs.readFileSync('schema.sql', 'utf8');
        await client.query(schema);
        console.log("✅ ADATBÁZIS OK");
        client.release();
    } catch (err) { console.error("❌ DB HIBA:", err); }
}
initDB();

// --- API ---

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

app.post('/api/register', async (req, res) => {
    const { username, password, refCode } = req.body;
    
    // 🛑 KÖTELEZŐ MEGHÍVÓ LOGIKA 🛑
    if (!refCode) return res.status(400).json({ error: "Meghívó kód kötelező!" });

    try {
        const client = await pool.connect();
        let finalRef = null;

        // HA A KÓD "START" -> Ez a Mester Kulcs (Neked)
        if (refCode === 'START') {
            finalRef = null; // Nincs felettesed, te vagy a csúcson
        } else {
            // Normál user: Ellenőrizzük, létezik-e a meghívó
            const refCheck = await client.query('SELECT username FROM users WHERE username = $1', [refCode]);
            if (refCheck.rows.length === 0) {
                client.release();
                return res.status(400).json({ error: "Érvénytelen meghívó kód!" });
            }
            finalRef = refCode;
        }

        const newUser = await client.query(
            'INSERT INTO users (username, telegram_id, balance, vip_level, referrer) VALUES ($1, $2, 0, 0, $3) RETURNING *',
            [username, password, finalRef]
        );

        res.json({ success: true, user: newUser.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: "Ez a név már foglalt!" }); }
});

// ADATOK LEKÉRÉSE
app.get('/api/user/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.json(user.rows[0]);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ADMIN API
app.get('/api/admin/users', async (req, res) => {
    try {
        const client = await pool.connect();
        const users = await client.query('SELECT * FROM users ORDER BY id DESC');
        res.json(users.rows);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ZENYX ONLINE PORT ${PORT}`));