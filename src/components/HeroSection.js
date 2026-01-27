import React from 'react';
import './HeroSection.css';

function HeroSection() {
  
  const scrollToContent = () => {
    const element = document.getElementById('tudastar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='hero-container'>
      {/* Sötétítő réteg CSS-ben van kezelve */}
      
      <div className='hero-content'>
        <h1 className='hero-title'>AZ ŐSI TUDÁS ÉBREDÉSE</h1>
        
        <p className='hero-subtitle'>
          Fedezd fel a szakrális geometria és a kozmikus rend rejtett összefüggéseit.
          A valóság több, mint amit a szemed lát.
        </p>
        
        <button className='hero-btn' onClick={scrollToContent}>
          BELÉPÉS A TUDÁSTÁRBA
        </button>
      </div>
    </div>
  );
}

export default HeroSection;