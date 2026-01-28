import React from 'react';
import './HeroSection.css';

function HeroSection() {
  
  return (
    <div className='hero-wrapper'>
      
      {/* 1. VIDEÓ SÁV - A FŐ LÁTVÁNYELEM */}
      <div className='hero-video-container'>
        <video className='hero-video' autoPlay loop muted playsInline>
            {/* HA LETÖLTÖTTED A VIDEÓT, TEDD A public MAPPÁBA 'hero_video.mp4' NÉVEN! */}
            <source src="/hero_video.mp4" type="video/mp4" />
            {/* Tartalék online videó, amíg nincs meg a saját fájl */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-craftsman-working-with-copper-wire-in-workshop-42686-large.mp4" type="video/mp4" />
        </video>
        
        <div className='hero-overlay'>
            <h1 className='main-brand'>A&T HARMONIES</h1>
            <p className='brand-subtitle'>ONLINE MŰHELY</p>
            <p className='brand-tagline'>"Az információ maga a hatalom – A tudás felszabadít"</p>
        </div>
      </div>

      {/* 2. KÜLDETÉSEM (A KÉPRŐL MÁSOLVA) */}
      <div className='mission-section'>
        <h2 className='mission-title'>KÜLDETÉSEM</h2>
        <div className='mission-text'>
            <p>
            Üdvözöllek! Attila vagyok. Éveket töltöttem azzal, hogy megértsem világunk eltitkolt működését és az elveszett ősi technológiákat.
            </p>
            <p>
            Célom, hogy visszahozzam a köztudatba azt a tudást, ami egykor mindenkié volt: a szakrális geometria erejét, a vízprogramozást és a tudatos teremtés eszközeit.
            </p>
            <p>
            Nem csak beszélek róla – elkészítem azokat az eszközöket, amelyek segítenek emelni a rezgésszintedet.
            </p>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;