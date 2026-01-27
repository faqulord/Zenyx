const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// --- MONGODB CSATLAKOZÁS ---
const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/atharmonies";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ MongoDB csatlakoztatva!");
        initVisitorCounter(); // Inicializáljuk a számlálót
    })
    .catch(err => console.error("❌ MongoDB hiba:", err));

// --- ADAT MODELLEK ---
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String, category: String, desc: String, price: String, image: String
}));

const Order = mongoose.model('Order', new mongoose.Schema({
    customer: String, total: String, status: { type: String, default: 'Fizetve' }, date: { type: Date, default: Date.now }
}));

// Látogató számláló modell
const Visitor = mongoose.model('Visitor', new mongoose.Schema({
    count: { type: Number, default: 0 },
    lastReset: { type: Date, default: Date.now }
}));

// Számláló inicializálása ha még nincs
async function initVisitorCounter() {
    const existing = await Visitor.findOne();
    if (!existing) {
        await new Visitor({ count: 0 }).save();
    }
}

// --- API ÚTVONALAK ---

// Látogatás rögzítése
app.post('/api/track-visit', async (req, res) => {
    try {
        await Visitor.updateOne({}, { $inc: { count: 1 } });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Összesített statisztikák lekérése az Adminnak
app.get('/api/stats', async (req, res) => {
    try {
        const orders = await Order.find();
        const visitorData = await Visitor.findOne();
        
        const totalRevenue = orders.reduce((sum, order) => {
            const priceNum = parseInt(order.total.replace(/[^0-9]/g, '')) || 0;
            return sum + priceNum;
        }, 0);

        res.json({
            totalRevenue,
            orderCount: orders.length,
            visitorCount: visitorData ? visitorData.count : 0
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Havi zárás (számláló nullázása)
app.post('/api/stats/reset-monthly', async (req, res) => {
    try {
        await Visitor.updateOne({}, { count: 0, lastReset: new Date() });
        res.json({ message: "Sikeres havi zárás!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/api/products', async (req, res) => { res.json(await Product.find()); });
app.get('/api/orders', async (req, res) => { res.json(await Order.find().sort({ date: -1 })); });
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Szerver fut: ${PORT}`));