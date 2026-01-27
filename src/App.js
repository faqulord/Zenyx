import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ProductSection from './components/ProductSection'; // Ez maradhat "Kiemelt" résznek a főoldalon
import ShopPage from './components/ShopPage';
import Footer from './components/Footer';

function App() {
  // Ez figyeli, melyik oldalon vagyunk éppen (alapból: home)
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {/* A Navigációt mindig látjuk */}
      <Navbar setPage={setCurrentPage} currentPage={currentPage} />

      {/* HA a Kezdőlapon vagyunk: */}
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <ContentSection />
          {/* A főoldalon is hagyhatunk egy kis ízelítőt */}
          <ProductSection /> 
        </>
      )}

      {/* HA a Webshopon vagyunk: */}
      {currentPage === 'shop' && (
        <ShopPage />
      )}

      <Footer />
    </div>
  );
}

export default App;