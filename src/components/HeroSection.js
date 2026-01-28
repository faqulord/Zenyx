import React, { useState, useRef, useEffect } from 'react';
import './HeroSection.css';

// KÜLÖN KOMPONENS - OKOS VIDEÓ
const VideoSlide = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Alapból némítva (böngésző szabály)

  useEffect(() => {
    // Ez a "Figyelő" (Observer) nézi, hogy látszik-e a videó
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Ha látszik (több mint 60%-a), indítsa el
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(e => console.log("Autoplay tiltva:", e));
        } else {
          // Ha nem látszik (elhúztuk), állítsa meg
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 } // Akkor vált, ha 60%-ban látszik
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className='video-slide'>
      <video 
        ref={videoRef}
        className='hero-video' 
        loop 
        muted={isMuted} 
        playsInline
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* GOMBOK A VIDEÓN BELÜL */}
      <div className='slide-controls'>
        <button className='mini-btn' onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className='mini-btn' onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
};

function HeroSection() {
  const videos = [
    "/f4f90c192194013e3eb5f3c706610a00.mp4", // 1.
    "/9514134033bc1b315731183b4182a616.mp4", // 2.
    "/55b0f7affa28e85c72fc029862fdfa78.mp4", // 3.
    "/8e1e7f238199161e219718f94c97b58d.mp4"  // 4.
  ];

  return (
    <div className='hero-wrapper'>
      
      <div className='video-slider-container'>
        {videos.map((vid, index) => (
           <VideoSlide key={index} src={vid} />
        ))}
        
        <div className='swipe-hint'>➔</div>
      </div>

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