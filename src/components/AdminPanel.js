import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  // Ez figyeli, melyik menüpont aktív az Adminon belül
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='admin-container'>
      
      {/* --- OLDALSÁV (SIDEBAR) --- */}
      <div className='admin-sidebar'>
        <div className='admin-logo'>A&T HARMONIES</div>
        
        <div className='sidebar-menu'>
          {/* VEZÉRLŐPULT GOMB */}
          <div 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Vezérlőpult
          </div>

          {/* RENDELÉSEK GOMB */}
          <div 
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} 
            onClick={() => setActiveTab('orders')}
          >
            📦 Rendelések <span className='badge'>3</span>
          </div>

          {/* TERMÉKEK GOMB */}
          <div 
            className={`menu-item ${activeTab === 'products' ? 'active' : ''}`} 
            onClick={() => setActiveTab('products')}
          >
            🏷️ Termékek
          </div>

          {/* VÁSÁRLÓK GOMB */}
          <div 
            className={`menu-item ${activeTab === 'customers' ? 'active' : ''}`} 
            onClick={() => setActiveTab('customers')}
          >
            👥 Vásárlók
          </div>

          {/* STATISZTIKÁK GOMB */}
          <div 
            className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`} 
            onClick={() => setActiveTab('analytics')}
          >
            📈 Statisztikák
          </div>

           {/* BEÁLLÍTÁSOK GOMB */}
           <div 
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Beállítások
          </div>
        </div>

        <button className='back-to-site' onClick={() => setPage('home')}>
          ⬅ Vissza a Shopba
        </button>
      </div>

      {/* --- FŐ TARTALOM (JOBB OLDAL) --- */}
      <div className='admin-content'>
        
        {/* FEJLÉC */}
        <div className='admin-header'>
          <div>
            <div className='admin-title'>
              {activeTab === 'dashboard' && 'Szia Attila! 👋'}
              {activeTab === 'orders' && 'Rendelések Kezelése'}
              {activeTab === 'products' && 'Termékeid'}
              {activeTab === 'customers' && 'Vásárlói Lista'}
              {activeTab === 'analytics' && 'Részletes Elemzés'}
              {activeTab === 'settings' && 'Fiók Beállítások'}
            </div>
            <p className='admin-subtitle'>
              {activeTab === 'dashboard' && 'Itt látod a webáruházad mai teljesítményét.'}
              {activeTab === 'orders' && 'Itt kezelheted a beérkező megrendeléseket.'}
              {activeTab === 'products' && 'Itt adhatsz hozzá új termékeket vagy módosíthatod a régieket.'}
            </p>
          </div>
          <div className='user-profile'>
            👤 Takács Attila (Tulajdonos)
          </div>
        </div>

        {/* --- 1. VEZÉRLŐPULT TARTALOM --- */}
        {activeTab === 'dashboard' && (
          <>
            <div className='stats-grid'>
              <div className='stat-card'>
                <div className='stat-title'>MAI BEVÉTEL</div>
                <div className='stat-value'>48.500 Ft</div>
                <div className='stat-trend trend-up'>⬆ 15% a tegnapihoz képest</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>LÁTOGATÓK</div>
                <div className='stat-value'>342</div>
                <div className='stat-trend'>➡ Stabil forgalom (TikTok)</div>
              </div>
              <div className='stat-card'>
                <div className='stat-title'>KONVERZIÓS ARÁNY</div>
                <div className='stat-value'>2.4%</div>
                <div className='stat-trend trend-up'>⬆ Átlag feletti</div>
              </div>
            </div>

            <div className='orders-section'>
              <div className='section-header-row'>
                <h3>Legutóbbi rendelések</h3>
                <span className='view-all' onClick={() => setActiveTab('orders')}>Összes megtekintése</span>
              </div>
              <div className='table-header'>
                <div>Rendelés #</div>
                <div>Vásárló</div>
                <div>Dátum</div>
                <div>Összeg</div>
                <div>Státusz</div>
              </div>
              <div className='order-row'>
                <div className='order-id'>#1024</div>
                <div>Kovács Péter</div>
                <div>Ma, 10:23</div>
                <div>12.990 Ft</div>
                <div><span className='status-badge paid'>Fizetve</span></div>
              </div>
              <div className='order-row'>
                <div className='order-id'>#1023</div>
                <div>Nagy Anna</div>
                <div>Ma, 08:45</div>
                <div>24.990 Ft</div>
                <div><span className='status-badge pending'>Feldolgozás</span></div>
              </div>
            </div>
          </>
        )}

        {/* --- 2. RENDELÉSEK TARTALOM --- */}
        {activeTab === 'orders' && (
          <div className='orders-section'>
            <div className='section-header-row' style={{border:'none'}}>
               {/* Itt lehetne szűrő gombok */}
               <div style={{display:'flex', gap:'10px'}}>
                  <button style={{padding:'5px 10px', background:'#e4e5e7', border:'none', borderRadius:'4px', cursor:'pointer'}}>Összes</button>
                  <button style={{padding:'5px 10px', background:'white', border:'1px solid #ccc', borderRadius:'4px', cursor:'pointer'}}>Nyitott</button>
                  <button style={{padding:'5px 10px', background:'white', border:'1px solid #ccc', borderRadius:'4px', cursor:'pointer'}}>Teljesített</button>
               </div>
            </div>

            <div className='table-header'>
              <div>Rendelés #</div>
              <div>Vásárló</div>
              <div>Dátum</div>
              <div>Összeg</div>
              <div>Fizetés</div>
              <div>Szállítás</div>
            </div>

            {/* Bővített lista */}
            <div className='order-row' style={{gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr'}}>
              <div className='order-id'>#1024</div>
              <div>Kovács Péter</div>
              <div>Ma, 10:23</div>
              <div>12.990 Ft</div>
              <div><span className='status-badge paid'>Fizetve</span></div>
              <div><span className='status-badge pending'>Csomagolás</span></div>
            </div>

            <div className='order-row' style={{gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr'}}>
              <div className='order-id'>#1023</div>
              <div>Nagy Anna</div>
              <div>Ma, 08:45</div>
              <div>24.990 Ft</div>
              <div><span className='status-badge pending'>Utalásra vár</span></div>
              <div><span className='status-badge pending'>Függőben</span></div>
            </div>

            <div className='order-row' style={{gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr'}}>
              <div className='order-id'>#1022</div>
              <div>Szabó Gábor</div>
              <div>Tegnap, 22:10</div>
              <div>8.500 Ft</div>
              <div><span className='status-badge paid'>Fizetve</span></div>
              <div><span className='status-badge paid'>Elküldve</span></div>
            </div>
             <div className='order-row' style={{gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr'}}>
              <div className='order-id'>#1021</div>
              <div>Varga Judit</div>
              <div>Tegnap, 14:30</div>
              <div>18.500 Ft</div>
              <div><span className='status-badge paid'>Fizetve</span></div>
              <div><span className='status-badge paid'>Elküldve</span></div>
            </div>
          </div>
        )}

        {/* --- 3. TERMÉKEK TARTALOM (Demo) --- */}
        {activeTab === 'products' && (
           <div className='orders-section'>
              <div style={{textAlign:'center', padding:'40px', color:'#6d7175'}}>
                 <div style={{fontSize:'3rem', marginBottom:'20px'}}>🏷️</div>
                 <h3>Termékek betöltése...</h3>
                 <p>Itt fogod látni és szerkeszteni az összes termékedet.</p>
                 <button style={{marginTop:'20px', padding:'10px 20px', background:'#008060', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>+ Új termék hozzáadása</button>
              </div>
           </div>
        )}

        {/* --- EGYÉB FÜLEK (Placeholder) --- */}
        {(activeTab === 'customers' || activeTab === 'analytics' || activeTab === 'settings') && (
            <div className='orders-section'>
              <div style={{textAlign:'center', padding:'40px', color:'#6d7175'}}>
                 <h3>Fejlesztés alatt...</h3>
                 <p>Ez a funkció a demó verzióban még nem aktív, de a véglegesben elérhető lesz!</p>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;