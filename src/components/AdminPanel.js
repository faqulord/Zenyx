import React from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  return (
    <div className='admin-container'>
      
      {/* 1. OLDALSÁV - Mint a Shopifyban */}
      <div className='admin-sidebar'>
        <div className='admin-logo'>A&T ADMIN</div>
        
        <div className='sidebar-menu'>
          <div className='menu-item active'>📊 Vezérlőpult</div>
          <div className='menu-item'>📦 Rendelések <span style={{marginLeft:'auto', background:'#008060', padding:'2px 6px', borderRadius:'10px', fontSize:'0.7rem', color:'white'}}>3</span></div>
          <div className='menu-item'>🏷️ Termékek</div>
          <div className='menu-item'>👥 Vásárlók</div>
          <div className='menu-item'>📈 Elemzések</div>
          <div className='menu-item'>⚙️ Beállítások</div>
        </div>

        <button className='back-to-site' onClick={() => setPage('home')}>
          ⬅ Vissza a Shopba
        </button>
      </div>

      {/* 2. FŐ TARTALOM */}
      <div className='admin-content'>
        
        {/* Fejléc */}
        <div className='admin-header'>
          <div className='header-text'>
            <div className='admin-title'>Jó reggelt, Attila! 👋</div>
            <p style={{color:'#6d7175', margin:'5px 0 0'}}>Itt vannak a mai nap legfontosabb adatai.</p>
          </div>
          <div className='user-profile'>
            👤 Takács Attila (Admin)
          </div>
        </div>

        {/* Statisztikák */}
        <div className='stats-grid'>
          {/* Kártya 1: Bevétel */}
          <div className='stat-card'>
            <div className='stat-title'>TELJES BEVÉTEL (MA)</div>
            <div className='stat-value'>48.500 Ft</div>
            <div className='stat-trend trend-up'>
              ⬆ 15% a tegnapihoz képest
            </div>
          </div>

          {/* Kártya 2: Látogatók */}
          <div className='stat-card'>
            <div className='stat-title'>LÁTOGATÓK</div>
            <div className='stat-value'>342</div>
            <div className='stat-trend trend-neutral'>
              ➡ Stabil forgalom (TikTok)
            </div>
          </div>

          {/* Kártya 3: Konverzió */}
          <div className='stat-card'>
            <div className='stat-title'>KONVERZIÓS ARÁNY</div>
            <div className='stat-value'>2.4%</div>
            <div className='stat-trend trend-up'>
              ⬆ Átlag feletti
            </div>
          </div>
        </div>

        {/* Legutóbbi rendelések */}
        <div className='orders-section'>
          <div className='section-header-row'>
            <h3 style={{margin:0}}>Legutóbbi rendelések</h3>
            <span style={{color:'#008060', cursor:'pointer', fontWeight:'600', fontSize:'0.9rem'}}>Összes megtekintése</span>
          </div>

          {/* Táblázat Fejléc */}
          <div className='table-header'>
            <div>Rendelés #</div>
            <div>Vásárló</div>
            <div>Dátum</div>
            <div>Összeg</div>
            <div>Státusz</div>
          </div>

          {/* Rendelés 1 */}
          <div className='order-row'>
            <div style={{fontWeight:'bold'}}>#1024</div>
            <div>Kovács Péter</div>
            <div>Ma, 10:23</div>
            <div>12.990 Ft</div>
            <div><span className='status-badge status-paid'>Fizetve</span></div>
          </div>

          {/* Rendelés 2 */}
          <div className='order-row'>
            <div style={{fontWeight:'bold'}}>#1023</div>
            <div>Nagy Anna</div>
            <div>Ma, 08:45</div>
            <div>24.990 Ft</div>
            <div><span className='status-badge status-pending'>Feldolgozás</span></div>
          </div>

          {/* Rendelés 3 */}
          <div className='order-row'>
            <div style={{fontWeight:'bold'}}>#1022</div>
            <div>Szabó Gábor</div>
            <div>Tegnap, 22:10</div>
            <div>8.500 Ft</div>
            <div><span className='status-badge status-paid'>Fizetve</span></div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminPanel;