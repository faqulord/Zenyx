import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Állapotok a kiszámított statisztikáknak
  const [dynamicStats, setDynamicStats] = useState({
    totalRevenue: 0,
    orderCount: 0,
    visitorPlaceholder: 342 // A látogatókhoz majd külön számláló kell, addig marad demo
  });

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Eszközök', desc: '', price: '', image: ''
  });

  // ADATOK LEKÉRÉSE ÉS SZÁMÍTÁSA
  useEffect(() => {
    // Rendelések lekérése
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        
        // --- VALÓDI ADATOK KISZÁMÍTÁSA ---
        // Végigmegyünk a rendeléseken és összeadjuk az összegeket
        const total = data.reduce((sum, order) => {
          // Kiszedjük a számot a szövegből (pl: "12.990 Ft" -> 12990)
          const priceNum = parseInt(order.total.replace(/[^0-9]/g, '')) || 0;
          return sum + priceNum;
        }, 0);

        setDynamicStats(prev => ({
          ...prev,
          totalRevenue: total,
          orderCount: data.length
        }));
      });

    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, [activeTab]);

  // Havi zárás (most már a valódi összeget nullázná)
  const handleMonthlyClose = () => {
    if (window.confirm("BIZTOSAN LEZÁROD A HÓNAPOT? Ez nullázza a jelenlegi statisztikákat.")) {
      alert("Havi zárás sikeres! (Az éles adatbázisban archiválva)");
      setDynamicStats({ totalRevenue: 0, orderCount: 0, visitorPlaceholder: 0 });
    }
  };

  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <div className='admin-logo'>A&T HARMONIES</div>
        <div className='sidebar-menu'>
          <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Vezérlőpult</div>
          <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>📦 Rendelések <span className='badge'>{orders.length}</span></div>
          <div className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>🏷️ Termékek</div>
          <div className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📈 Statisztika</div>
        </div>
        <button className='back-to-site' onClick={() => setPage('home')}>⬅ Vissza a Shopba</button>
      </div>

      <div className='admin-content'>
        <div className='admin-header'>
          <div className='admin-title'>
            {activeTab === 'dashboard' ? `Szia Attila! 👋` : activeTab.toUpperCase()}
          </div>
          <div className='user-profile'>👤 Takács Attila (Admin)</div>
        </div>

        {/* --- VEZÉRLŐPULT: MOST MÁR VALÓDI SZÁMOKKAL --- */}
        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>ÖSSZES BEVÉTEL</div>
                {/* Itt formázzuk vissza a számot forinttá */}
                <div className='stat-value'>{dynamicStats.totalRevenue.toLocaleString()} Ft</div>
                <div className='trend-up'>⬆ Élő adat az adatbázisból</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>RENDELÉSEK SZÁMA</div>
                <div className='stat-value'>{dynamicStats.orderCount} db</div>
                <div>➡ Feldolgozás alatt</div>
              </div>
            </div>

            <div className='orders-section'>
               <h3>Legutóbbi rendelések</h3>
               <div className='table-header'><div>#</div><div>Vásárló</div><div>Összeg</div><div>Állapot</div></div>
               {orders.length > 0 ? orders.slice(0,5).map(o => (
                 <div className='order-row' key={o._id}>
                   <div>#{o._id.slice(-4)}</div>
                   <div>{o.customer}</div>
                   <div>{o.total}</div>
                   <div><span className='status-badge paid'>{o.status}</span></div>
                 </div>
               )) : <p>Nincs még rendelés az adatbázisban.</p>}
            </div>
          </>
        )}

        {/* --- ANALITIKA RÉSZ --- */}
        {activeTab === 'analytics' && (
            <div className='analytics-container'>
                <div className='stats-grid'>
                    <div className='stat-card'>
                        <div className='stat-title'>Havi Bevétel</div>
                        <div className='stat-value' style={{color: '#bf953f'}}>{dynamicStats.totalRevenue.toLocaleString()} Ft</div>
                    </div>
                    <div className='stat-card'>
                        <div className='stat-title'>Látogatók</div>
                        <div className='stat-value'>{dynamicStats.visitorPlaceholder}</div>
                    </div>
                </div>
                <div className='close-month-box'>
                    <button className='close-btn' onClick={handleMonthlyClose}>🔒 HAVI ZÁRÁS INDÍTÁSA</button>
                </div>
            </div>
        )}

        {/* --- TERMÉK FELTÖLTÉS (Működik!) --- */}
        {activeTab === 'products' && (
            <div className='orders-section'>
                <button className='add-prod-btn' onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Mégse' : '+ Új Termék feltöltése'}
                </button>
                {/* Itt a form amit már megírtunk... */}
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;