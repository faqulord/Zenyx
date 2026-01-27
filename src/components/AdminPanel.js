import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'orders') {
      setLoading(true);
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(err => console.error("Hiba:", err));
    }
  }, [activeTab]);

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
        </div>
        <button className='back-to-site' onClick={() => setPage('home')}>⬅ Vissza a Shopba</button>
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <div>
            <div className='admin-title'>{activeTab === 'dashboard' ? 'Szia Attila! 👋' : activeTab.toUpperCase()}</div>
            <p className='admin-subtitle'>Adminisztrációs felület kezelése.</p>
          </div>
          <div className='user-profile'>👤 Takács Attila</div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>MAI BEVÉTEL</div>
                <div className='stat-value'>48.500 Ft</div>
                <div className='trend-up'>⬆ 15%</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>LÁTOGATÓK</div>
                <div className='stat-value'>342</div>
                <div>➡ Stabil</div>
              </div>
            </div>
            <div className='orders-section'>
              <h3>Legutóbbi rendelések</h3>
              {loading ? <p>Töltés...</p> : (
                <div className='order-list'>
                  {orders.slice(0, 5).map(o => (
                    <div className='order-row' key={o._id}>
                      <div className='order-id'>#{o._id.slice(-4)}</div>
                      <div>{o.customer}</div>
                      <div>{o.total}</div>
                      <div><span className='status-badge paid'>{o.status}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className='orders-section'>
            <div className='table-header'>
                <div>ID</div><div>Név</div><div>Dátum</div><div>Összeg</div><div>Állapot</div>
            </div>
            {orders.map(o => (
              <div className='order-row' key={o._id}>
                <div className='order-id'>#{o._id.slice(-4)}</div>
                <div>{o.customer}</div>
                <div>{new Date(o.date).toLocaleDateString()}</div>
                <div>{o.total}</div>
                <div><span className='status-badge paid'>{o.status}</span></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
            <div className='orders-section' style={{textAlign:'center', padding:'50px'}}>
                <h3>Termékkezelő Modul</h3>
                <p>Kattints az új termék hozzáadásához az adatbázisba.</p>
                <button className='back-to-site' style={{background:'#008060', color:'#fff', border:'none'}}>+ Új termék</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;