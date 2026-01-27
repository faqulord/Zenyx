import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ShopPage from './components/ShopPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  // Itt tároljuk, hol jár éppen Attila az oldalon
  const [currentPage, setCurrentPage] = useState('home');

  // Ha oldalt váltunk, ugorjon a tetejére
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="App">
      
      {/* --- HA AZ ADMIN FELÜLETET NÉZZÜK --- */}
      {currentPage === 'admin' ? (
        <AdminPanel setPage={setCurrentPage} />
      ) : (
        
        /* --- HA A VÁSÁRLÓI FELÜLETET NÉZZÜK --- */
        <>
          <Navbar setPage={setCurrentPage} currentPage={currentPage} />

          {/* Főoldal: Hero + Tartalom */}
          {currentPage === 'home' && (
            <>
              <HeroSection />
              <ContentSection />
            </>
          )}

          {/* Webshop oldal: Csak a termékek */}
          {currentPage === 'shop' && (
            <ShopPage />
          )}

          <Footer />
          
          {/* --- TITKOS GOMB A DEMÓHOZ (JOBB ALUL) --- */}
          {/* Ezzel váltasz át az Admin felületre a bemutató közben */}
          <button 
            onClick={() => setCurrentPage('admin')}
            style={{
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                padding: '8px 15px',
                background: 'rgba(0,0,0,0.8)',
                color: '#bf953f',
                border: '1px solid #bf953f',
                borderRadius: '5px',
                fontSize: '12px',
                cursor: 'pointer',
                zIndex: 9999,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}
          >
            Admin Demo
          </button>
        </>
      )}
    </div>
  );
}

export default App;