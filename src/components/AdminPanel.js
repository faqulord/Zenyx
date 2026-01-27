import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='admin-container'>
      
      {/* --- OLDALSÁV / MOBIL MENÜ --- */}
      <div className='admin-sidebar'>
        <div className='admin-logo'>
            A&T HARMONIES
            {/* Mobil Kilépés Gomb (Csak mobilon látszik) */}
            <div className='mobile-exit' onClick={() => setPage('home')}>
                Kilépés ➡
            </div>
        </div>
        
        <div className='sidebar-menu'>
          <div 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Vezérlőpult
          </div>

          <div 
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} 
            onClick={() => setActiveTab('orders')}
          >
            📦 Rendelések <span className='badge'>3</span>
          </div>

          <div 
            className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} 
            onClick={() => setActiveTab('products')}
          >
            🏷️ Termékek
          </div>

          <div 
            className={`menu-item ${activeTab === 'customers' ? 'active' : ''}`} 
            onClick={() => setActiveTab('customers')}
          >
            👥 Vásárlók
          </div>

          <div 
            className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} 
            onClick={() => setActiveTab('analytics')}
          >
            📈 Statisztikák
          </div>

           <div 
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Beállítások
          </div>
        </div>

        {/* Asztali Kilépés Gomb (Mobilon eltűnik) */}
        <button className='back-to-site' onClick={() => setPage('home')}>
          ⬅ Vissza a Shopba
        </button>
      </div>

      {/* --- TARTALOM --- */}
      <div className='admin-content'>
        
        <div className='admin-header'>
          <div>
            <div className='admin-title'>
              {activeTab === 'dashboard' && 'Szia Attila! 👋'}
              {activeTab === 'orders' && 'Rendelések'}
              {activeTab === 'products' && 'Termékek'}
              {activeTab === 'customers' && 'Vásárlók'}
              {activeTab === 'analytics' && 'Elemzések'}
              {activeTab === 'settings' && 'Beállítások'}
            </div>
            <p className='admin-subtitle'>
              {activeTab === 'dashboard' && 'Itt látod a webáruházad mai teljesítményét.'}
            </p>
          </div>
          <div className='user-profile'>
            👤 Takács Attila (Tulajdonos)
          </div>
        </div>

        {/* VEZÉRLŐPULT */}
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
              <div className='stat-card'>
                <div className='stat-title'>KONVERZIÓ</div>
                <div className='stat-value'>2.4%</div>
                <div className='trend-up'>⬆ Átlag feletti</div>
              </div>
            </div>

            <div className='orders-section'>
               <h3>Legutóbbi rendelések</h3>
               <div className='table-header'>
                  <div>#</div><div>Név</div><div>Dátum</div><div>Összeg</div><div>Státusz</div>
               </div>
               <div className='order-row'>
                  <div>#1024</div><div>Kovács Péter</div><div>Ma, 10:23</div><div>12.990 Ft</div><div><span className='status-badge paid'>Fizetve</span></div>
               </div>
               <div className='order-row'>
                  <div>#1023</div><div>Nagy Anna</div><div>Ma, 08:45</div><div>24.990 Ft</div><div><span className='status-badge pending'>Feldolgozás</span></div>
               </div>
            </div>
          </>
        )}

        {/* EGYÉB FÜLEK DEMO */}
        {activeTab !== 'dashboard' && (
             <div className='orders-section' style={{textAlign:'center', padding:'50px'}}>
                 <div style={{fontSize:'3rem'}}>🚀</div>
                 <h3>{activeTab.toUpperCase()} betöltése...</h3>
                 <p>Ez a menüpont a demóban csak szemléltetés.</p>
             </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;