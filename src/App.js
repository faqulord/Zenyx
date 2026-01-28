import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShopPage from './components/ShopPage';
import OrgonInfo from './components/OrgonInfo';
import AboutPage from './components/AboutPage';
import AszfPage from './components/AszfPage';
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
          <Navbar setPage={setCurrentPage} />
          
          {/* FŐOLDAL: Videó + Logó + UTÁNA RÖGTÖN A TERMÉKEK */}
          {currentPage === 'home' && (
            <>
                <HeroSection /> 
                <ShopPage />  {/* Itt jelennek meg a termékek a főoldalon! */}
            </>
          )}

          {/* EGYÉB OLDALAK */}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'orgon-info' && <OrgonInfo />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'aszf' && <AszfPage />}
          
          {currentPage === 'contact' && <div style={{padding:'50px',textAlign:'center'}}><h2>Kapcsolat</h2><p>Hamarosan...</p></div>}

          <div style={{textAlign:'center', padding:'30px', background:'#f8f8f8', color:'#888', fontSize:'0.8rem', borderTop:'1px solid #eee'}}>
            A&T Harmonies 2026 - Minden jog fenntartva.
          </div>
          
           <button 
            onClick={() => setCurrentPage('admin')}
            style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.1, fontSize: '10px', border:'none', background:'transparent' }}
          >
            Admin
          </button>
        </>
      )}
    </div>
  );
}

export default App;