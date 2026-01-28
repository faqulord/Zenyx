import React, { useState, useRef } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [isMuted, setIsMuted] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Refek a videókhoz, hogy irányítani tudjuk őket
  const videoRefs = useRef([]);

  const videos = [
    "/f4f90c192194013e3eb5f3c706610a00.mp4", // 1. Kezes videó
    "/9514134033bc1b315731183b4182a616.mp4", // 2. Orgonitok
    "/55b0f7affa28e85c72fc029862fdfa78.mp4",
    "/8e1e7f238199161e219718f94c97b58d.mp4"
  ];

  // Hang váltása MINDEN videón egyszerre
  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    videoRefs.current.forEach(video => {
        if(video) video.muted = newState;
    });
  };

  // Lejátszás/Szünet MINDEN videón egyszerre
  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    videoRefs.current.forEach(video => {
        if(video) {
            newState ? video.play() : video.pause();
        }
    });
  };

  return (
    <div className='hero-wrapper'>
      
      {/* KERETES VIDEÓ DOBOZ */}
      <div className='video-slider-container'>
        {videos.map((vid, index) => (
            <div className='video-slide' key={index}>
                <video 
                    ref={el => videoRefs.current[index] = el}
                    className='hero-video' 
                    autoPlay 
                    loop 
                    muted={isMuted} // Itt kapja meg a közös némítást
                    playsInline
                >
                    <source src={vid} type="video/mp4" />
                </video>
            </div>
        ))}
        
        {/* LAPOZÁS JELZŐ NYÍL */}
        <div className='swipe-hint'>➔</div>
      </div>

      {/* VEZÉRLŐ GOMBOK - KÖZÉPEN, JÓL LÁTHATÓAN */}
      <div className='video-controls'>
         <button className='control-btn' onClick={togglePlay}>
            {isPlaying ? '⏸ STOP' : '▶ START'}
         </button>
         <button className='control-btn' onClick={toggleMute}>
            {isMuted ? '🔇 HANG BE' : '🔊 HANG KI'}
         </button>
      </div>

      {/* LOGÓ ÉS IDÉZET */}
      <div className='hero-branding-section'>
         <img 
            src="https://atharmonies.com/cdn/shop/files/monies_1.png?v=1761293221&width=1600" 
            alt="Logo" 
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