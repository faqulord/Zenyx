const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// --- MONGODB CSATLAKOZÁS ---
// Railway-en a MONGO_URL változót kell majd beállítanod!
const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/atharmonies";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB csatlakoztatva!"))
    .catch(err => console.error("❌ MongoDB hiba:", err));

// --- ADAT MODELL ---
const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    desc: String,
    price: String,
    image: String
});
const Product = mongoose.model('Product', ProductSchema);

const OrderSchema = new mongoose.Schema({
    customer: String,
    total: String,
    status: { type: String, default: 'Fizetve' },
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// --- API ÚTVONALAK ---

// Termékek lekérése
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rendelések lekérése
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Új termék mentése
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- REACT KISZOLGÁLÁSA ---
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Szerver fut: ${PORT} porton`));