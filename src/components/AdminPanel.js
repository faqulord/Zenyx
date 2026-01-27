import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ setPage }) {
  // Alapból a vezérlőpulton vagyunk
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='admin-container'>
      
      {/* --- BAL OLDALI SÁV (MOBILON FELSŐ MENÜ) --- */}
      <div className='admin-sidebar'>
        <div className='admin-logo'>
            A&T HARMONIES
            {/* Mobil Kilépés Gomb */}
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

        {/* Asztali Kilépés Gomb */}
        <button className='back-to-site' onClick={() => setPage('home')}>
          ⬅ Vissza a Shopba
        </button>
      </div>

      {/* --- TARTALOM (JOBB OLDAL) --- */}
      <div className='admin-content'>
        
        {/* FEJLÉC - Mindig változik attól függően, hol vagyunk */}
        <div className='admin-header'>
          <div>
            <div className='admin-title'>
              {activeTab === 'dashboard' && 'Szia Attila! 👋'}
              {activeTab === 'orders' && 'Rendelések Kezelése'}
              {activeTab === 'products' && 'Termékeid Listája'}
              {activeTab === 'customers' && 'Vásárlói Adatbázis'}
              {activeTab === 'analytics' && 'Részletes Statisztika'}
              {activeTab === 'settings' && 'Fiók Beállítások'}
            </div>
            <p className='admin-subtitle'>
              {activeTab === 'dashboard' && 'Itt látod a webáruházad mai teljesítményét.'}
              {activeTab === 'orders' && 'Itt kezelheted a beérkező megrendeléseket.'}
              {activeTab === 'products' && 'Tölts fel új termékeket vagy szerkeszd a meglévőket.'}
              {activeTab === 'customers' && 'Itt látod, kik vásároltak tőled eddig.'}
              {activeTab === 'analytics' && 'Elemezd a forgalmat és a konverziókat.'}
              {activeTab === 'settings' && 'Szállítási és fizetési módok beállítása.'}
            </p>
          </div>
          <div className='user-profile'>
            👤 Takács Attila (Tulajdonos)
          </div>
        </div>

        {/* --- 1. VEZÉRLŐPULT --- */}
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

        {/* --- 2. RENDELÉSEK --- */}
        {activeTab === 'orders' && (
             <div className='orders-section'>
                 <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
                    <button style={{padding:'8px 15px', background:'#202223', color:'white', border:'none', borderRadius:'5px'}}>Összes</button>
                    <button style={{padding:'8px 15px', background:'white', border:'1px solid #ccc', borderRadius:'5px'}}>Nyitott</button>
                    <button style={{padding:'8px 15px', background:'white', border:'1px solid #ccc', borderRadius:'5px'}}>Teljesített</button>
                 </div>
                 
                 <div className='table-header'>
                  <div>#</div><div>Név</div><div>Dátum</div><div>Összeg</div><div>Státusz</div>
                 </div>
                 {/* Bővebb lista a demóhoz */}
                 <div className='order-row'><div>#1024</div><div>Kovács Péter</div><div>Ma, 10:23</div><div>12.990 Ft</div><div><span className='status-badge paid'>Fizetve</span></div></div>
                 <div className='order-row'><div>#1023</div><div>Nagy Anna</div><div>Ma, 08:45</div><div>24.990 Ft</div><div><span className='status-badge pending'>Utalásra vár</span></div></div>
                 <div className='order-row'><div>#1022</div><div>Szabó Gábor</div><div>Tegnap, 22:10</div><div>8.500 Ft</div><div><span className='status-badge paid'>Elküldve</span></div></div>
                 <div className='order-row'><div>#1021</div><div>Varga Judit</div><div>Tegnap, 14:30</div><div>18.500 Ft</div><div><span className='status-badge paid'>Kézbesítve</span></div></div>
             </div>
        )}

        {/* --- 3. TERMÉKEK (DEMO ÜZENET) --- */}
        {activeTab === 'products' && (
            <div className='orders-section' style={{textAlign:'center', padding:'60px 20px'}}>
                <div style={{fontSize:'3rem', marginBottom:'10px'}}>🏷️</div>
                <h3>Termékek betöltése...</h3>
                <p style={{color:'#666', marginBottom:'20px'}}>A demó verzióban a termékek kezelése korlátozott. Az éles rendszerben itt tudsz majd új terméket feltölteni.</p>
                <button style={{padding:'10px 20px', background:'#008060', color:'white', border:'none', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>+ Új termék hozzáadása</button>
            </div>
        )}

        {/* --- 4. VÁSÁRLÓK (DEMO ÜZENET) --- */}
        {activeTab === 'customers' && (
            <div className='orders-section' style={{textAlign:'center', padding:'60px 20px'}}>
                <div style={{fontSize:'3rem', marginBottom:'10px'}}>👥</div>
                <h3>Vásárlói adatbázis</h3>
                <p style={{color:'#666'}}>Itt fogod látni a regisztrált vásárlóidat és a rendelési történetüket.</p>
            </div>
        )}

        {/* --- 5. EGYÉB FÜLEK --- */}
        {(activeTab === 'analytics' || activeTab === 'settings') && (
            <div className='orders-section' style={{textAlign:'center', padding:'60px 20px'}}>
                <div style={{fontSize:'3rem', marginBottom:'10px'}}>⚙️</div>
                <h3>Beállítások konfigurálása</h3>
                <p style={{color:'#666'}}>Ez a funkció az éles rendszerben lesz elérhető a domain csatlakoztatása után.</p>
            </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;