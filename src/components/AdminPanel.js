import React from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  return (
    <div className='admin-container'>
      
      {/* --- BAL OLDALI MENÜ --- */}
      <div className='admin-sidebar'>
        <div className='admin-logo'>A&T HARMONIES</div>
        
        <div className='sidebar-menu'>
          <div className='menu-item active'>📊 Vezérlőpult</div>
          <div className='menu-item'>📦 Rendelések <span className='badge'>3</span></div>
          <div className='menu-item'>🏷️ Termékek</div>
          <div className='menu-item'>👥 Vásárlók</div>
          <div className='menu-item'>📈 Statisztikák</div>
          <div className='menu-item'>⚙️ Beállítások</div>
        </div>

        {/* Gomb visszalépéshez a webshopba */}
        <button className='back-to-site' onClick={() => setPage('home')}>
          ⬅ Vissza a Shopba
        </button>
      </div>

      {/* --- FŐ TARTALOM (JOBB OLDAL) --- */}
      <div className='admin-content'>
        
        {/* Fejléc */}
        <div className='admin-header'>
          <div>
            <div className='admin-title'>Szia Attila! 👋</div>
            <p className='admin-subtitle'>Itt látod a webáruházad mai teljesítményét.</p>
          </div>
          <div className='user-profile'>
            👤 Takács Attila (Tulajdonos)
          </div>
        </div>

        {/* 1. Statisztikai Kártyák */}
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

        {/* 2. Legutóbbi Rendelések Táblázat */}
        <div className='orders-section'>
          <div className='section-header-row'>
            <h3>Legutóbbi rendelések</h3>
            <span className='view-all'>Összes megtekintése</span>
          </div>

          <div className='table-header'>
            <div>Rendelés #</div>
            <div>Vásárló</div>
            <div>Dátum</div>
            <div>Összeg</div>
            <div>Státusz</div>
          </div>

          {/* Minta Adatok */}
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

          <div className='order-row'>
            <div className='order-id'>#1022</div>
            <div>Szabó Gábor</div>
            <div>Tegnap, 22:10</div>
            <div>8.500 Ft</div>
            <div><span className='status-badge paid'>Fizetve</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;