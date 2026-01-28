import React, { useState } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [isMuted, setIsMuted] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(true); // Lejátszás állapota

  // A GitHubra feltöltött videók (AZ ELSŐ A KÉZES/KRISTÁLYOS!)
  const videos = [
    "/f4f90c192194013e3eb5f3c706610a00.mp4", // Kezes videó
    "/9514134033bc1b315731183b4182a616.mp4",
    "/55b0f7affa28e85c72fc029862fdfa78.mp4",
    "/8e1e7f238199161e219718f94c97b58d.mp4"
  ];

  const handleUnmute = () => setIsMuted(false);
  
  const togglePlay = () => {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    });
    setIsPlaying(!isPlaying);
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
                    muted={isMuted} 
                    playsInline
                >
                    <source src={vid} type="video/mp4" />
                </video>
            </div>
        ))}
        
        {/* VEZÉRLŐ GOMBOK (Középen úsznak) */}
        <div className='video-controls'>
            {isMuted && (
                <button className='control-btn' onClick={handleUnmute}>
                    🔊 HANG
                </button>
            )}
            <button className='control-btn' onClick={togglePlay}>
                {isPlaying ? '⏸ SZÜNET' : '▶ LEJÁTSZÁS'}
            </button>
        </div>

        <div className='swipe-hint'>⬌ Húzd el a galériát! ⬌</div>
      </div>

      {/* 2. LOGÓ ÉS IDÉZET (Ez maradt a videó alatt) */}
      <div className='hero-branding-section'>
         <img 
            src="https://atharmonies.com/cdn/shop/files/monies_1.png?v=1761293221&width=1600" 
            alt="A&T Harmonies Logo" 
            className='hero-logo-img fade-in-up'
         />
         
         <div className='brand-quote fade-in-up delay-1'>
            "A szakrális geometria és a természetes kristályok átalakítanak, emléleztetnek, harmonizálva az energiát, a belső békét."
         </div>
         
         {/* Itt vége a Hero-nak, ezután jönnek majd a termékek az App.js-ben */}
      </div>

    </div>
  );
}

export default HeroSection;