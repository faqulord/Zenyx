import React from 'react';
import './HeroSection.css';

function HeroSection() {
  
  const scrollToShop = () => {
    // Ha van ShopPage ID-d, oda görget, de most sima gombként működik
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <h1 className='hero-title'>A&T HARMONIES</h1>
        
        <p className='hero-subtitle'>
          Réz. Kristály. Tudatosság.<br/>
          Kézzel kovácsolt energetikai eszközök, közvetlenül a műhelyből.<br/>
          <span style={{fontSize: '0.8rem', color: '#aaa', marginTop: '10px', display: 'block'}}>
            "Nem gyógyászati eszköz, hanem társ a harmonikusabb környezetért."
          </span>
        </p>

        <button className='hero-btn' onClick={scrollToShop}>
          BELÉPÉS A MŰHELYBE
        </button>
      </div>
    </div>
  );
}

export default HeroSection;