import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // STATISZTIKA ÁLLAPOTOK (Ezeket az élesben az adatbázisból számoljuk majd)
  const [stats, setStats] = useState({
    dailyVisitors: 342,
    monthlyTotalVisitors: 8450,
    monthlyRevenue: "1.240.000 Ft",
    dailyRevenue: "48.500 Ft",
    conversion: "2.4%",
    abandonment: "12%",
    avgOrderValue: "16.200 Ft"
  });

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Eszközök', desc: '', price: '', image: ''
  });

  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
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
      alert("Termék sikeresen hozzáadva!");
    });
  };

  // --- HAVI ZÁRÁS FUNKCIÓ ---
  const handleMonthlyClose = () => {
    const confirmClose = window.confirm(
      "BIZTOSAN LEZÁROD A HÓNAPOT?\n\nEz az akció archiválja az eddigi bevételeket, és nullázza a havi látogatottsági mutatókat az új időszakhoz."
    );
    if (confirmClose) {
      // Itt élesben egy API hívás menne, ami elmenti a 'MonthlyReports' kollekcióba
      alert("Havi zárás sikeres! A jelentés generálása folyamatban...");
      // Demo jelleggel nullázunk pár értéket
      setStats({...stats, monthlyTotalVisitors: 0, monthlyRevenue: "0 Ft"});
    }
  };

  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <div className='admin-logo'>
            A&T HARMONIES
            <div className='mobile-exit' onClick={() => setPage('home')}>Kilépés ➡</div>
        </div>
        
        <div className='sidebar-menu'>
          <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Vezérlőpult</div>
          <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>📦 Rendelések <span className='badge'>{orders.length}</span></div>
          <div className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>🏷️ Termékek</div>
          <div className={`menu-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>👥 Vásárlók</div>
          <div className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📈 Statisztika</div>
          <div className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>⚙️ Beállítások</div>
        </div>
        <button className='back-to-site' onClick={() => setPage('home')}>⬅ Vissza a Shopba</button>
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <div>
            <div className='admin-title'>
                {activeTab === 'dashboard' && 'Üdvözöllek, Attila! 👋'}
                {activeTab === 'products' && 'Termékek Kezelése'}
                {activeTab === 'analytics' && 'Élő Statisztikák & Jelentések'}
            </div>
            <p className='admin-subtitle'>A&T Harmonies Adminisztráció</p>
          </div>
          <div className='user-profile'>👤 Takács Attila (Admin)</div>
        </div>

        {/* --- VEZÉRLŐPULT --- */}
        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>MAI BEVÉTEL</div>
                <div className='stat-value'>{stats.dailyRevenue}</div>
                <div className='trend-up'>⬆ 15% növekedés</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>LÁTOGATÓK (MA)</div>
                <div className='stat-value'>{stats.dailyVisitors}</div>
                <div>➡ Stabil forgalom</div>
              </div>
            </div>
            <div className='orders-section'>
               <h3>Legutóbbi rendelések</h3>
               <div className='table-header'><div>#</div><div>Vásárló</div><div>Összeg</div><div>Állapot</div></div>
               {orders.slice(0,5).map(o => (
                 <div className='order-row' key={o._id}><div>#{o._id.slice(-4)}</div><div>{o.customer}</div><div>{o.total}</div><div><span className='status-badge paid'>{o.status}</span></div></div>
               ))}
            </div>
          </>
        )}

        {/* --- STATISZTIKA & ZÁRÁS FÜL --- */}
        {activeTab === 'analytics' && (
            <div className='analytics-container'>
                {/* NAPI ADATOK */}
                <h4 className='section-label'>Napi Teljesítmény</h4>
                <div className='stats-grid'>
                    <div className='stat-card'>
                        <div className='stat-title'>Napi Látogató</div>
                        <div className='stat-value'>{stats.dailyVisitors}</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-title'>Napi Bevétel</div>
                        <div className='stat-value' style={{color: '#008060'}}>{stats.dailyRevenue}</div>
                    </div>
                </div>

                {/* HAVI ADATOK */}
                <h4 className='section-label' style={{marginTop:'30px'}}>Havi Összesítés</h4>
                <div className='stats-grid'>
                    <div className='stat-card'>
                        <div className='stat-title'>Havi Összes Látogató</div>
                        <div className='stat-value'>{stats.monthlyTotalVisitors}</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-title'>Havi Bevétel</div>
                        <div className='stat-value' style={{color: '#bf953f'}}>{stats.monthlyRevenue}</div>
                    </div>
                </div>

                {/* ARÁNYOK */}
                <h4 className='section-label' style={{marginTop:'30px'}}>Hatékonysági Mutatók</h4>
                <div className='stats-grid'>
                    <div className='stat-card'>
                        <div className='stat-title'>Konverzió</div>
                        <div className='stat-value'>{stats.conversion}</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-title'>Kosárelhagyás</div>
                        <div className='stat-value' style={{color: '#d32f2f'}}>{stats.abandonment}</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-title'>Átlag Kosárérték</div>
                        <div className='stat-value'>{stats.avgOrderValue}</div>
                    </div>
                </div>

                {/* HAVI ZÁRÁS GOMB */}
                <div className='close-month-box'>
                    <p>A havi zárás archiválja a jelenlegi adatokat és tiszta lapot nyit a következő hónapnak.</p>
                    <button className='close-btn' onClick={handleMonthlyClose}>🔒 HAVI ZÁRÁS INDÍTÁSA</button>
                </div>
            </div>
        )}

        {/* --- TERMÉKEK FÜL --- */}
        {activeTab === 'products' && (
            <div className='orders-section'>
                <div className='section-header-row'>
                    <h3>Aktív termékek ({products.length})</h3>
                    <button className='add-prod-btn' onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Bezárás' : '+ Új Termék'}
                    </button>
                </div>
                {showForm && (
                    <form className='product-form' onSubmit={handleProductSubmit}>
                        <input type="text" placeholder="Termék neve" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                        <input type="text" placeholder="Ár" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                        <input type="text" placeholder="Kép URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} required />
                        <textarea placeholder="Leírás..." value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} required />
                        <button type="submit" className='submit-btn'>Mentés</button>
                    </form>
                )}
                {/* ... lista renderelés ... */}
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;