import React, { useState, useRef } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [isMuted, setIsMuted] = useState(true); // Központi némítás állapot
  
  // A GitHubra feltöltött 4 videó
  const videos = [
    "/9514134033bc1b315731183b4182a616.mp4",
    "/55b0f7affa28e85c72fc029862fdfa78.mp4",
    "/8e1e7f238199161e219718f94c97b58d.mp4",
    "/f4f90c192194013e3eb5f3c706610a00.mp4"
  ];

  const handleUnmute = () => {
    setIsMuted(false); // Minden videó hangját bekapcsolja
  };

  return (
    <div className='hero-wrapper'>
      
      {/* 1. LAPOZHATÓ VIDEÓ GALÉRIA */}
      <div className='video-slider-container'>
        {videos.map((vid, index) => (
            <div className='video-slide' key={index}>
                <video 
                    className='hero-video' 
                    autoPlay 
                    loop 
                    muted={isMuted} // Itt figyelik a központi némítást
                    playsInline
                >
                    <source src={vid} type="video/mp4" />
                </video>
            </div>
        ))}
        
        {/* HANG GOMB - A videó tetején úszik */}
        {isMuted && (
            <button className='unmute-overlay-btn' onClick={handleUnmute}>
                🔊 HANG BEKAPCSOLÁSA
            </button>
        )}

        <div className='swipe-hint'>⬌ Húzd el a galériát! ⬌</div>
      </div>

      {/* 2. LOGÓ ÉS SZLOGEN SÁV (Animált) */}
      <div className='hero-branding-section'>
         <img 
            src="https://atharmonies.com/cdn/shop/files/monies_1.png?v=1761293221&width=1600" 
            alt="A&T Harmonies Logo" 
            className='hero-logo-img fade-in-up'
         />
         
         <div className='brand-quote fade-in-up delay-1'>
            "A szakrális geometria és a természetes kristályok átalakítanak, emléleztetnek, harmonizálva az energiát, a belső békét."
         </div>
      </div>

      {/* 3. KI VAGYOK ÉN */}
      <div className='mission-section'>
        <h2 className='mission-title'>KI VAGYOK ÉN</h2>
        <div className='mission-text'>
            <p>
            A kapcsolatom a rézzel 2024-ben kezdődött, amikor személyes problémáimra kerestem megoldást. Egy barátom javasolta, hogy földeljek, készítsek magamnak valamit rézből, és elkezdtem hajtogatni, fonni egy egyszerű karperecet – és csodával határos módon aznap este nyugodt, kiegyensúlyozott és türelmes lettem.
            </p>
            <p>
            Ez az esemény hívott meg az anyaghoz. Itt kezdődött az életutam. Megismerkedtem a réz energiáival, tanulmányoztam az ősi civilizációk használatát a Suméroktól az Atlantisziakon át az ősi magyarokig, és itt ismertem meg Slim Spurling amerikai mester munkáit is, aki a tensor technológiát felfedezte. Slim rámutatott, hogy a réz nemcsak vezeti az energiát, hanem a készítő szándékát is, miközben közvetíti az univerzum éltető rezgéseit.
            </p>
            <p>
            Ezekből a tudásokból merítve kezdtem el alkotni – minden darabom célja, hogy viselője ne csak szépséget lásson, hanem jótékony, harmonizáló energiát is érezzen. Ötvözöm a kristályokat, ásványokat és a szakrális geometriát a rézzel, minden eszköz egyedi, kézzel készített, rusztikus formában, tiszta szándékkal.
            </p>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;