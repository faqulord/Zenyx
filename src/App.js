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
          {/* 1. Teljes képernyős Kozmosz + Gomb */}
          <HeroSection />
          
          {/* 2. Ez van alatta (Attila bemutatkozása), ide görget a gomb */}
          <ContentSection />
        </>
      )}

      {currentPage === 'shop' && (
        <ShopPage />
      )}

      <Footer />
    </div>
  );
}

export default App;