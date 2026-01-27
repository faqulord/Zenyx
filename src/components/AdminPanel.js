import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Élő statisztikák az adatbázisból
  const [liveStats, setLiveStats] = useState({
    totalRevenue: 0,
    orderCount: 0,
    visitorCount: 0
  });

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Eszközök', desc: '', price: '', image: ''
  });

  // ADATOK BETÖLTÉSE
  const loadData = () => {
    fetch('/api/stats').then(res => res.json()).then(data => setLiveStats(data));
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  };

  useEffect(() => {
    loadData();
    // 30 másodpercenként frissítünk, hogy tényleg "élő" legyen
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      setProducts([...products, data]);
      setShowForm(false);
      setNewProduct({ name: '', category: 'Eszközök', desc: '', price: '', image: '' });
      alert("Termék elmentve!");
    });
  };

  // --- HAVI ZÁRÁS ---
  const handleMonthlyClose = () => {
    if (window.confirm("BIZTOSAN LEZÁROD A HÓNAPOT?\nEz nullázza a látogatottságot és archiválja a bevételt.")) {
      fetch('/api/stats/reset-monthly', { method: 'POST' })
        .then(res => res.json())
        .then(() => {
          alert("Havi zárás sikeres!");
          loadData();
        });
    }
  };

  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <div className='admin-logo'>A&T HARMONIES <div className='mobile-exit' onClick={() => setPage('home')}>Kilépés ➡</div></div>
        <div className='sidebar-menu'>
          <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Vezérlőpult</div>
          <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>📦 Rendelések <span className='badge'>{liveStats.orderCount}</span></div>
          <div className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>🏷️ Termékek</div>
          <div className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📈 Statisztika</div>
        </div>
        <button className='back-to-site' onClick={() => setPage('home')}>⬅ Vissza a Shopba</button>
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <div>
            <div className='admin-title'>{activeTab === 'dashboard' ? 'Szia Attila! 👋' : activeTab.toUpperCase()}</div>
            <p className='admin-subtitle'>Élő adatok az adatbázisból</p>
          </div>
          <div className='user-profile'>👤 Takács Attila</div>
        </div>

        {/* --- VEZÉRLŐPULT --- */}
        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>BEVÉTEL (ÖSSZES)</div>
                <div className='stat-value' style={{color:'#008060'}}>{liveStats.totalRevenue.toLocaleString()} Ft</div>
                <div className='trend-up'>⬆ Frissítve: ÉPP MOST</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>LÁTOGATÓK</div>
                <div className='stat-value'>{liveStats.visitorCount}</div>
                <div className='trend-up'>👥 Valós idejű számláló</div>
              </div>
            </div>
            {/* Rendelések táblázat... */}
          </>
        )}

        {/* --- STATISZTIKA & ZÁRÁS --- */}
        {activeTab === 'analytics' && (
          <div className='analytics-container'>
            <div className='stats-grid'>
               <div className='stat-card'>
                  <div className='stat-title'>HAVI ÖSSZES LÁTOGATÓ</div>
                  <div className='stat-value'>{liveStats.visitorCount}</div>
               </div>
               <div className='stat-card'>
                  <div className='stat-title'>HAVI FORGALOM</div>
                  <div className='stat-value'>{liveStats.totalRevenue.toLocaleString()} Ft</div>
               </div>
            </div>
            <div className='close-month-box' style={{marginTop:'40px', padding:'30px', background:'#fff0f0', borderRadius:'10px', border:'1px dashed red', textAlign:'center'}}>
               <p style={{color:'red', fontWeight:'bold'}}>FIGYELEM: A havi zárás nullázza a látogatottsági mutatókat!</p>
               <button className='close-btn' onClick={handleMonthlyClose} style={{background:'red', color:'white', padding:'15px 30px', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'}}>🔒 HAVI ZÁRÁS</button>
            </div>
          </div>
        )}

        {/* ... Termék feltöltő form ... */}
      </div>
    </div>
  );
}

export default AdminPanel;