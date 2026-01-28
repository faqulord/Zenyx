import React, { useState, useRef } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [isMuted, setIsMuted] = useState(true); // Alapból némítva indul
  const videoRef = useRef(null);

  // Hang bekapcsolása funkció
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Némítás levétele
      videoRef.current.volume = 1.0;  // Teljes hangerő
      setIsMuted(false);              // Állapot frissítése
      videoRef.current.play();        // Biztos ami biztos, elindítjuk
    }
  };

  return (
    <div className='hero-wrapper'>
      
      {/* 1. VIDEÓ SÁV */}
      <div className='hero-video-container'>
        <video 
            ref={videoRef}
            className='hero-video' 
            autoPlay 
            loop 
            muted={true} 
            playsInline
        >
            {/* Itt a feltöltött fájlod neve a képről! */}
            <source src="/9514134033bc1b315731183b4182a616.mp4" type="video/mp4" />
        </video>
        
        <div className='hero-overlay'>
            <h1 className='main-brand'>A&T HARMONIES</h1>
            <p className='brand-subtitle'>ONLINE MŰHELY</p>
            
            {/* VILLOGÓ GOMB - Csak akkor látszik, ha némítva van */}
            {isMuted && (
                <button className='unmute-btn' onClick={handleUnmute}>
                    🔊 HANG BEKAPCSOLÁSA
                </button>
            )}
        </div>
      </div>

      {/* 2. KÜLDETÉSEM SZÖVEG */}
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