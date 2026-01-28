import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShopPage from './components/ShopPage';
import OrgonInfo from './components/OrgonInfo';
import AboutPage from './components/AboutPage'; // Új import
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
          
          {currentPage === 'home' && <HeroSection />}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'orgon-info' && <OrgonInfo />}
          {currentPage === 'about' && <AboutPage />} {/* Ki vagyok oldal */}
          
          {currentPage === 'contact' && <div style={{padding:'50px',textAlign:'center'}}><h2>Kapcsolat</h2><p>Hamarosan...</p></div>}
          {currentPage === 'aszf' && <div style={{padding:'50px',textAlign:'center'}}><h2>ÁSZF</h2><p>Feltöltés alatt...</p></div>}

          <div style={{textAlign:'center', padding:'20px', background:'#f4f4f4', color:'#777', fontSize:'0.8rem'}}>
            A&T Harmonies 2026
          </div>
          
           <button 
            onClick={() => setCurrentPage('admin')}
            style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.3, fontSize: '10px' }}
          >
            Admin
          </button>
        </>
      )}
    </div>
  );
}

export default App;