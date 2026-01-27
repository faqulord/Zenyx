import React from 'react';
import './ContentSection.css';

function ContentSection() {
  return (
    <div className='content-container'>
      
      {/* 1. AZ IDÉZET - KÖZPONTI ELEM */}
      <div className='quote-box'>
        <h2 className='quote-text'>"AZ INFORMÁCIÓ MAGA A HATALOM."</h2>
        <p className='quote-author'>- A tudás felszabadít</p>
      </div>

      {/* 2. SZOLGÁLTATÁSOK / INFO KÁRTYÁK */}
      <div className='info-grid'>
        <div className='info-card'>
          <div className='card-icon'>👁️</div>
          <h3 className='card-title'>TILTOTT RÉGÉSZET</h3>
          <p className='card-desc'>
            Fedezd fel a történelmünk eltitkolt részleteit. Tartaria elveszett birodalmától a Belső Föld elméletéig.
            Ne elégedj meg a felszínnel.
          </p>
        </div>

        <div className='info-card'>
          <div className='card-icon'>⚡</div>
          <h3 className='card-title'>TUDATOSSÁG</h3>
          <p className='card-desc'>
            Emeld a rezgésszintedet. Tanulj a szakrális geometriáról, az 5. dimenzióról és a belső teremtő erődről.
            A változás belül kezdődik.
          </p>
        </div>

        <div className='info-card'>
          <div className='card-icon'>🛒</div>
          <h3 className='card-title'>PRÉMIUM ESZKÖZÖK</h3>
          <p className='card-desc'>
            Hamarosan elérhetőek a fizikai és szellemi jólétet támogató termékek. 
            Csatlakozz a zárt közösséghez!
          </p>
        </div>
      </div>

      {/* 3. SOCIAL MÉDIA SZEKCIÓ */}
      <div className='social-section'>
        <h3 className='social-title'>CSATLAKOZZ A KÖZÖSSÉGHEZ</h3>
        <div className='social-buttons'>
          <a href="https://www.tiktok.com/@ujfold.zarak.es" target="_blank" rel="noreferrer" className='social-btn tiktok-btn'>
            Kövesd TikTokon
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className='social-btn facebook-btn'>
            Facebook Közösség
          </a>
        </div>
      </div>

    </div>
  );
}

export default ContentSection;