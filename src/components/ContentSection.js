import React from 'react';
import './ContentSection.css';

function ContentSection() {
  return (
    <div className='content-container' id='tudastar'> {/* Itt az ID a gombhoz! */}
      
      {/* 1. AZ IDÉZET */}
      <div className='quote-box'>
        <h2 className='quote-text'>"AZ INFORMÁCIÓ MAGA A HATALOM."</h2>
        <p className='quote-author'>- A tudás felszabadít</p>
      </div>

      {/* 2. RÓLAM / KÜLDETÉS (ÚJ RÉSZ ATTILÁNAK) */}
      <div className='about-section'>
        <h3 className='section-header'>KÜLDETÉSEM</h3>
        <p className='about-text'>
          Üdvözöllek! Attila vagyok. Éveket töltöttem azzal, hogy megértsem világunk eltitkolt működését és az elveszett ősi technológiákat. 
          Célom, hogy visszahozzam a köztudatba azt a tudást, ami egykor mindenkié volt: a szakrális geometria erejét, 
          a vízprogramozást és a tudatos teremtés eszközeit. Nem csak beszélek róla – elkészítem azokat az eszközöket, 
          amelyek segítenek emelni a rezgésszintedet.
        </p>
      </div>

      {/* 3. TUDÁS KÁRTYÁK */}
      <div className='info-grid'>
        <div className='info-card'>
          <div className='card-icon'>👁️</div>
          <h3 className='card-title'>TILTOTT RÉGÉSZET</h3>
          <p className='card-desc'>
            Fedezd fel a történelmünk eltitkolt részleteit. Tartaria elveszett birodalmától a Belső Föld elméletéig.
          </p>
        </div>

        <div className='info-card'>
          <div className='card-icon'>⚡</div>
          <h3 className='card-title'>TUDATOSSÁG</h3>
          <p className='card-desc'>
            Emeld a rezgésszintedet. Tanulj a szakrális geometriáról, az 5. dimenzióról és a belső teremtő erődről.
          </p>
        </div>

        <div className='info-card'>
          <div className='card-icon'>⚛️</div>
          <h3 className='card-title'>TENSOR TECHNOLÓGIA</h3>
          <p className='card-desc'>
            Slim Spurling nyomán: hogyan hatnak a rézgyűrűk a vízre és az emberi biológiai mezőre?
          </p>
        </div>
      </div>

      {/* 4. SOCIAL MÉDIA */}
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