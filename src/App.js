import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ShopPage from './components/ShopPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // --- LÁTOGATÓ KÖVETÉSE ---
    // Csak akkor küldünk jelet, ha ebben a munkamenetben még nem tettük
    if (!sessionStorage.getItem('visited')) {
      fetch('/api/track-visit', { method: 'POST' })
        .then(() => sessionStorage.setItem('visited', 'true'))
        .catch(err => console.error("Tracking error:", err));
    }
  }, [currentPage]);

  return (
    <div className="App">
      {currentPage === 'admin' ? (
        <AdminPanel setPage={setCurrentPage} />
      ) : (
        <>
          <Navbar setPage={setCurrentPage} currentPage={currentPage} />
          {currentPage === 'home' && (
            <>
              <HeroSection />
              <ContentSection />
            </>
          )}
          {currentPage === 'shop' && <ShopPage />}
          <Footer />
          <button 
            onClick={() => setCurrentPage('admin')}
            style={{ position: 'fixed', bottom: '10px', right: '10px', padding: '8px 15px', background: 'rgba(0,0,0,0.8)', color: '#bf953f', border: '1px solid #bf953f', borderRadius: '5px', fontSize: '12px', cursor: 'pointer', zIndex: 9999, fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Admin Demo
          </button>
        </>
      )}
    </div>
  );
}

export default App;