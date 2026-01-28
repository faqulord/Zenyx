import React from 'react';
import './HeroSection.css';

function HeroSection() {
  // Képek a mozgó galériához (Attila termékei)
  const galleryImages = [
    "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600",
    "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600",
    "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600",
    "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600",
    "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600"
  ];

  return (
    <div className='hero-wrapper'>
      
      {/* 1. RÉSZ: A CÍM ÉS A MOZGÓ HÁTTÉR */}
      <div className='hero-header'>
        <h1 className='main-brand'>A&T HARMONIES</h1>
        <p className='brand-subtitle'>ONLINE MŰHELY</p>
      </div>

      {/* MOZGÓ GALÉRIA SÁV */}
      <div className='marquee-container'>
        <div className='marquee-content'>
            {/* Kétszer rendereljük a képeket, hogy végtelen legyen a mozgás */}
            {galleryImages.map((img, i) => <img key={i} src={img} alt="Műhely munka" />)}
            {galleryImages.map((img, i) => <img key={`dup-${i}`} src={img} alt="Műhely munka" />)}
        </div>
      </div>

      {/* 2. RÉSZ: KÜLDETÉSEM (A KÉPRŐL MÁSOLVA SZÓRÓL SZÓRA) */}
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