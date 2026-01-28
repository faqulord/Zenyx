import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShopPage from './components/ShopPage';
import OrgonInfo from './components/OrgonInfo'; // ÚJ IMPORT
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="App">
      {currentPage === 'admin' ? (
        <AdminPanel setPage={setCurrentPage} />
      ) : (
        <>
          <Navbar setPage={setCurrentPage} currentPage={currentPage} />
          
          {currentPage === 'home' && <HeroSection />}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'orgon-info' && <OrgonInfo />} {/* ÚJ OLDAL */}
          {/* A többi oldalra egyelőre placeholder */}
          {(currentPage === 'about' || currentPage === 'contact') && (
              <div style={{padding:'100px', textAlign:'center'}}><h2>Feltöltés alatt...</h2></div>
          )}

          <div style={{textAlign:'center', padding:'40px', background:'#333', color:'#aaa', marginTop:'auto'}}>
            <p>Kövess be Facebookon és TikTokon is!</p>
            <p>A&T Harmonies 2026</p>
          </div>

          <button 
            onClick={() => setCurrentPage('admin')}
            style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.5, fontSize: '10px' }}
          >
            Admin
          </button>
        </>
      )}
    </div>
  );
}

export default App;