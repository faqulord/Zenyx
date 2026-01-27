import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <h1 className='hero-title'>AZ ŐSI TUDÁS ÉBREDÉSE</h1>
        <p className='hero-subtitle'>
          Fedezd fel a szakrális geometria és a kozmikus rend rejtett összefüggéseit.
          Lépj be a tudatosság új dimenziójába.
        </p>
        <button className='hero-btn'>
          BELÉPÉS A TUDÁSTÁRBA
        </button>
      </div>
    </div>
  );
}

export default HeroSection;