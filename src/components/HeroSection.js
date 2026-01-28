import React from 'react';
import './HeroSection.css';

function HeroSection() {
  
  // ITT VANNAK A MÉDIA ELEMEK (Videó + Képek)
  const mediaItems = [
    {
        type: 'video',
        src: 'https://assets.mixkit.co/videos/preview/mixkit-craftsman-working-with-copper-wire-in-workshop-42686-large.mp4', // Ideiglenes műhely videó
        poster: 'https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600'
    },
    { type: 'image', src: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600" },
    { type: 'image', src: "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600" },
    { type: 'image', src: "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600" },
    { type: 'image', src: "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600" }
  ];

  return (
    <div className='hero-wrapper'>
      
      <div className='hero-header'>
        <h1 className='main-brand'>A&T HARMONIES</h1>
        <p className='brand-subtitle'>ONLINE MŰHELY</p>
      </div>

      {/* HÚZHATÓ GALÉRIA (SCROLL SNAP) */}
      <div className='swipe-gallery'>
        {mediaItems.map((item, index) => (
            <div className='gallery-item' key={index}>
                {item.type === 'video' ? (
                    <video controls poster={item.poster} className='gallery-media'>
                        <source src={item.src} type="video/mp4" />
                        A böngésződ nem támogatja a videót.
                    </video>
                ) : (
                    <img src={item.src} alt="Műhely pillanatkép" className='gallery-media' />
                )}
            </div>
        ))}
      </div>
      <p style={{textAlign:'center', fontSize:'0.8rem', color:'#999', marginTop:'5px'}}>⬌ Húzd el a galériát balra a többi képért!</p>

      {/* KÜLDETÉS - ATTILA SZÖVEGE */}
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