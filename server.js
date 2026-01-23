require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { Telegraf } = require('telegraf');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// --- AUTOMATIKUS TÁBLA LÉTREHOZÁS (JAVÍTÁS) ---
async function initDB() {
    try {
        const client = await pool.connect();
        const schema = fs.readFileSync('schema.sql', 'utf8');
        await client.query(schema);
        console.log("✅ ADATBÁZIS TÁBLÁK LÉTREHOZVA!");
        client.release();
    } catch (err) { console.error("❌ DB INIT HIBA:", err); }
}
initDB(); // Indításkor lefut

// --- KONSTANSOK ---
const ADMIN_PHONE = "+36301209301";
const ADMIN_PASS = "admin123";

// --- API VÉGPONTOK ---

// 1. BELÉPÉS (TELEFONSZÁMMAL)
app.post('/api/login', async (req, res) => {
    const { phone, password } = req.body;

    // ADMIN MESTERKULCS ELLENŐRZÉS
    if (phone === ADMIN_PHONE && password === ADMIN_PASS) {
        // Ha nincs fiókja az adminnak, létrehozzuk gyorsan a háttérben
        try {
            const client = await pool.connect();
            const check = await client.query('SELECT * FROM users WHERE phone = $1', [ADMIN_PHONE]);
            if (check.rows.length === 0) {
                await client.query("INSERT INTO users (phone, password, balance, vip_level) VALUES ($1, $2, 999999, 5)", [ADMIN_PHONE, ADMIN_PASS]);
            }
            const adminUser = await client.query('SELECT * FROM users WHERE phone = $1', [ADMIN_PHONE]);
            client.release();
            return res.json({ success: true, user: adminUser.rows[0], isAdmin: true });
        } catch (e) { console.log(e); }
    }

    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE phone = $1 AND password = $2', [phone, password]);
        
        if (user.rows.length === 0) return res.status(401).json({ error: "Hibás telefonszám vagy jelszó!" });
        
        res.json({ success: true, user: user.rows[0], isAdmin: (phone === ADMIN_PHONE) });
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 2. REGISZTRÁCIÓ
app.post('/api/register', async (req, res) => {
    const { phone, password, refCode } = req.body;

    if (!refCode) return res.status(400).json({ error: "Meghívó kód kötelező!" });

    try {
        const client = await pool.connect();
        let finalRef = null;

        // "START" KÓD = MESTERKULCS (Ha te regisztrálsz először)
        if (refCode === 'START' || refCode === ADMIN_PHONE) {
            finalRef = ADMIN_PHONE;
        } else {
            const refCheck = await client.query('SELECT phone FROM users WHERE phone = $1', [refCode]);
            if (refCheck.rows.length === 0) {
                client.release();
                return res.status(400).json({ error: "Érvénytelen meghívó kód!" });
            }
            finalRef = refCode;
        }

        const newUser = await client.query(
            'INSERT INTO users (phone, password, balance, vip_level, referrer) VALUES ($1, $2, 0, 0, $3) RETURNING *',
            [phone, password, finalRef]
        );

        res.json({ success: true, user: newUser.rows[0] });
        client.release();
    } catch (e) { res.status(500).json({ error: "Ez a telefonszám már regisztrált!" }); }
});

// 3. USER ADATOK
app.get('/api/user/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        res.json(user.rows[0]);
        client.release();
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 4. CSOMAG VÉTEL (MARAD A RÉGI)
app.post('/api/buy-node', async (req, res) => {
    // ... (Ugyanaz a logika mint eddig, csak a változók átírása nem kell)
    // Helytakarékosság miatt itt most csak a választ küldöm vissza, de a te kódodban benne hagyhatod a régit, csak a SELECT-nél figyelj a 'phone'-ra.
    // Mivel a 'buy-node' ID alapján keres, az nem változott!
    res.json({ success: true, message: "Demo mód: Vásárlás sikeres!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ZENYX SKYHIGH ENGINE ONLINE PORT ${PORT}`));