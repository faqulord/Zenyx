import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Új termék állapota
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Eszközök', desc: '', price: '', image: ''
  });

  // Adatok lekérése
  useEffect(() => {
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, [activeTab]);

  // Termék beküldése az adatbázisba
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

  return (
    <div className='admin-container'>
      
      {/* --- SIDEBAR / TOP MENU --- */}
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

      {/* --- CONTENT AREA --- */}
      <div className='admin-content'>
        <div className='admin-header'>
          <div>
            <div className='admin-title'>
                {activeTab === 'dashboard' && 'Üdvözöllek, Attila! 👋'}
                {activeTab === 'products' && 'Termékek Kezelése'}
                {activeTab === 'orders' && 'Rendelések listája'}
                {activeTab === 'analytics' && 'Részletes Statisztikák'}
            </div>
            <p className='admin-subtitle'>A&T Harmonies Vezérlőpult</p>
          </div>
          <div className='user-profile'>👤 Takács Attila (Admin)</div>
        </div>

        {/* --- VEZÉRLŐPULT --- */}
        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>MAI BEVÉTEL</div>
                <div className='stat-value'>48.500 Ft</div>
                <div className='trend-up'>⬆ 15% növekedés</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>LÁTOGATÓK</div>
                <div className='stat-value'>342</div>
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

        {/* --- TERMÉKEK FÜL (Itt tudsz hozzáadni!) --- */}
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
                        <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                            <option value="Eszközök">Eszközök</option>
                            <option value="Ékszerek">Ékszerek</option>
                            <option value="Könyvek">Könyvek</option>
                        </select>
                        <input type="text" placeholder="Ár (pl: 12.990 Ft)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                        <input type="text" placeholder="Kép URL linkje" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} required />
                        <textarea placeholder="Rövid leírás a hatásáról..." value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} required />
                        <button type="submit" className='submit-btn'>Mentés az Adatbázisba</button>
                    </form>
                )}

                <div className='table-header'><div>Kép</div><div>Név</div><div>Kategória</div><div>Ár</div></div>
                {products.map(p => (
                    <div className='order-row' key={p._id}>
                        <div><img src={p.image} style={{width:'40px', borderRadius:'4px'}} alt=""/></div>
                        <div style={{fontWeight:'bold'}}>{p.name}</div>
                        <div>{p.category}</div>
                        <div style={{color:'#008060', fontWeight:'bold'}}>{p.price}</div>
                    </div>
                ))}
            </div>
        )}

        {/* --- STATISZTIKA FÜL --- */}
        {activeTab === 'analytics' && (
            <div className='orders-section' style={{textAlign:'center', padding:'40px'}}>
                <h3>Élő Statisztikák</h3>
                <div className='stats-grid' style={{marginTop:'20px'}}>
                    <div className='stat-card'><h4>Konverzió</h4><p>2.4%</p></div>
                    <div className='stat-card'><h4>Kosárelhagyás</h4><p>12%</p></div>
                    <div className='stat-card'><h4>Átlagos kosárérték</h4><p>16.200 Ft</p></div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;