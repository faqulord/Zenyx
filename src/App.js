import React from 'react';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* 1. A kozmikus főoldal */}
      <HeroSection />
      
      {/* 2. Az idézet, bemutatkozás és social média gombok */}
      <ContentSection />
      
      {/* 3. A termékek (Könyvek, eszközök) */}
      <ProductSection />
      
      {/* 4. A lábléc (Copyright, linkek) */}
      <Footer />
    </div>
  );
}

export default App;