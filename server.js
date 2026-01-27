const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// --- MONGODB CSATLAKOZÁS ---
// A Railway-en majd be kell állítanod a MONGO_URL környezeti változót!
const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/attila_shop";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB csatlakoztatva!"))
    .catch(err => console.error("Hiba az adatbázisnál:", err));

// --- TERMÉK MODELL ---
const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    desc: String,
    price: String,
    image: String
});
const Product = mongoose.model('Product', ProductSchema);

// --- RENDELÉS MODELL ---
const OrderSchema = new mongoose.Schema({
    customer: String,
    total: String,
    status: { type: String, default: 'Fizetve' },
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// --- API VÉGPONTOK ---

// Termékek lekérése
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Rendelések lekérése az Adminnak
app.get('/api/orders', async (req, res) => {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
});

// Új termék hozzáadása (Admin felületről)
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// Kiszolgáljuk a React buildelt fájljait (Railway-hez fontos)
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));