import React, { useState } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [isMuted, setIsMuted] = useState(true); 

  // A videók listája
  const videos = [
    "/f4f90c192194013e3eb5f3c706610a00.mp4", // Kezes videó (Első)
    "/9514134033bc1b315731183b4182a616.mp4",
    "/55b0f7affa28e85c72fc029862fdfa78.mp4",
    "/8e1e7f238199161e219718f94c97b58d.mp4"
  ];

  const handleUnmute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className='hero-wrapper'>
      
      <div className='video-slider-container'>
        {videos.map((vid, index) => (
            <div className='video-slide' key={index}>
                <video 
                    className='hero-video' 
                    autoPlay={true} // Mindegyik próbál indulni, de némítva
                    loop 
                    muted={isMuted} 
                    playsInline
                >
                    <source src={vid} type="video/mp4" />
                </video>
            </div>
        ))}
        
        {/* Kis nyíl jelzi, hogy lehet lapozni */}
        <div className='swipe-hint'>➔</div>

        {/* HANG GOMB */}
        <div className='video-controls'>
            <button className='control-btn' onClick={handleUnmute}>
                {isMuted ? '🔇 HANG BE' : '🔊 HANG KI'}
            </button>
        </div>
      </div>

      {/* LOGÓ ÉS IDÉZET */}
      <div className='hero-branding-section'>
         <img 
            src="https://atharmonies.com/cdn/shop/files/monies_1.png?v=1761293221&width=1600" 
            alt="A&T Harmonies Logo" 
            className='hero-logo-img'
         />
         <div className='brand-quote'>
            "A szakrális geometria és a természetes kristályok átalakítanak, emléleztetnek, harmonizálva az energiát, a belső békét."
         </div>
      </div>
    </div>
  );
}

export default HeroSection;