import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ShopPage from './components/ShopPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <Navbar setPage={setCurrentPage} currentPage={currentPage} />

      {currentPage === 'home' && (
        <>
          <HeroSection />
          {/* Főoldalon: Csak a tartalom, bemutatkozás, idézet */}
          <ContentSection />
        </>
      )}

      {currentPage === 'shop' && (
        /* Webshop oldalon: Csak a termékek */
        <ShopPage />
      )}

      <Footer />
    </div>
  );
}

export default App;