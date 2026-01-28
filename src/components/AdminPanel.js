import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // DEMO ADATOK (Hogy látszódjon valami, amíg nincs backend)
    const [stats, setStats] = useState({
        totalRevenue: 1450000,
        orderCount: 12,
        visitorCount: 340
    });

    const [newProduct, setNewProduct] = useState({
        name: '', category: 'Eszközök', desc: '', price: '', image: ''
    });

    // ADATOK BETÖLTÉSE (Mockoltuk, hogy ne legyen hiba)
    const loadAllData = () => {
        // Itt lennének a fetch hívások, most csak logolunk
        console.log("Adatok frissítése...");
    };

    useEffect(() => {
        loadAllData();
        const interval = setInterval(loadAllData, 15000); 
        return () => clearInterval(interval);
    }, [activeTab]);

    const handleProductSubmit = (e) => {
        e.preventDefault();
        // Demo hozzáadás
        setProducts([...products, { ...newProduct, _id: Date.now().toString() }]);
        setShowForm(false);
        setNewProduct({ name: '', category: 'Eszközök', desc: '', price: '', image: '' });
        alert("Termék (Demo) hozzáadva!");
    };

    const handleMonthlyClose = () => {
        if (window.confirm("ZÁRÁS: Nullázod a látogatottságot és archiválod a havi bevételt?")) {
            alert("Hónap lezárva (Demo)!");
        }
    };

    return (
        <div className='admin-body-wrapper'>

            {/* --- BAL OLDALI MENÜ --- */}
            <div className='admin-sidebar'>
                <div className='admin-logo-box'>A&T ADMIN</div>
                <div className='sidebar-menu'>
                    <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Vezérlőpult</div>
                    <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>📦 Rendelések <span className='badge-count'>{stats.orderCount}</span></div>
                    <div className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>🏷️ Termékek</div>
                    <div className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📈 Statisztika</div>
                </div>
                <button className='logout-btn' onClick={() => setPage('home')}>⬅ Vissza a Shopba</button>
            </div>

            {/* --- TARTALOM --- */}
            <div className='admin-main-content'>

                <div className='admin-top-bar'>
                    <div className='admin-welcome'>
                        <h2>{activeTab === 'dashboard' ? 'Szia Attila! 👋' : activeTab.toUpperCase()}</h2>
                        <p>Webshop állapota: <span style={{color:'green'}}>● Aktív</span></p>
                    </div>
                    <div className='user-profile'>Takács Attila (Tulajdonos)</div>
                </div>

                {/* --- 1. VEZÉRLŐPULT --- */}
                {activeTab === 'dashboard' && (
                    <>
                        <div className='stats-container'>
                            <div className='stat-box'>
                                <div className='stat-label'>Összes Bevétel</div>
                                <div className='stat-number'>{stats.totalRevenue.toLocaleString()} Ft</div>
                                <div className='stat-sub'>⬆ Valós idejű</div>
                            </div>
                            <div className='stat-box'>
                                <div className='stat-label'>Összes Látogató</div>
                                <div className='stat-number'>{stats.visitorCount}</div>
                                <div className='stat-sub'>👥 Aktív számláló</div>
                            </div>
                            <div className='stat-box'>
                                <div className='stat-label'>Nyitott Rendelés</div>
                                <div className='stat-number'>{stats.orderCount} db</div>
                                <div className='stat-sub'>📦 Feldolgozás alatt</div>
                            </div>
                        </div>

                        <div className='admin-card'>
                            <div className='card-header'><h3>Legutóbbi aktivitás</h3></div>
                            <div className='empty-state'>Nincs új rendelés az elmúlt órában.</div>
                        </div>
                    </>
                )}

                {/* --- 2. TERMÉKEK --- */}
                {activeTab === 'products' && (
                    <div className='admin-card'>
                        <div className='card-header'>
                            <h3>Termékek ({products.length})</h3>
                            <button className='btn-add' onClick={() => setShowForm(!showForm)}>{showForm ? 'Bezár' : '+ Új Termék'}</button>
                        </div>

                        {showForm && (
                            <form className='prod-form' onSubmit={handleProductSubmit}>
                                <input type="text" placeholder="Termék neve" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                                <input type="text" placeholder="Ár (pl: 15.000 Ft)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                                <input type="text" placeholder="Kép URL link" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} required />
                                <textarea placeholder="Leírás" value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} />
                                <button type="submit" className='btn-save'>Mentés</button>
                            </form>
                        )}

                        <div className='table-row table-head'><div>Kép</div><div>Név</div><div>Ár</div><div>Kategória</div></div>
                        {products.length === 0 && <p style={{padding:'20px', textAlign:'center'}}>Jelenleg a ShopPage.js-ből tölti be a termékeket.</p>}
                        {products.map(p => (
                            <div className='table-row' key={p._id}>
                                <div><img src={p.image} width="30" alt="" /></div><div>{p.name}</div><div>{p.price}</div><div>{p.category}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- 3. STATISZTIKA & ZÁRÁS --- */}
                {activeTab === 'analytics' && (
                    <div className='admin-card'>
                        <h3>Havi jelentés</h3>
                        <div className='stats-container'>
                            <div className='stat-box' style={{borderLeft: '5px solid #bf953f'}}>
                                <div className='stat-label'>Havi Bevétel</div>
                                <div className='stat-number'>{stats.totalRevenue.toLocaleString()} Ft</div>
                            </div>
                            <div className='stat-box' style={{borderLeft: '5px solid #00b894'}}>
                                <div className='stat-label'>Havi Látogató</div>
                                <div className='stat-number'>{stats.visitorCount}</div>
                            </div>
                        </div>
                        <div style={{marginTop: '40px', padding: '20px', background: '#fff5f5', borderRadius: '10px'}}>
                            <h4 style={{color: '#d63031'}}>Veszélyes Zóna</h4>
                            <p>A havi zárás véglegesen nullázza a látogatottságot és archiválja a bevételt.</p>
                            <button className='btn-close-month' onClick={handleMonthlyClose}>🔒 HAVI ZÁRÁS ÉS NULLÁZÁS</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;