import React, { useState } from 'react';
import './HeroSection.css';

function HeroSection() {
  // A GitHubra feltöltött 4 videó fájlneve
  const videos = [
    "/9514134033bc1b315731183b4182a616.mp4",
    "/55b0f7affa28e85c72fc029862fdfa78.mp4",
    "/8e1e7f238199161e219718f94c97b58d.mp4",
    "/f4f90c192194013e3eb5f3c706610a00.mp4"
  ];

  return (
    <div className='hero-wrapper'>
      
      {/* 1. LAPOZHATÓ VIDEÓ GALÉRIA (SWIPE) */}
      <div className='video-slider-container'>
        {videos.map((vid, index) => (
            <div className='video-slide' key={index}>
                <video 
                    className='hero-video' 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src={vid} type="video/mp4" />
                </video>
            </div>
        ))}
        <div className='swipe-hint'>⬌ Húzd el a többi videóért! ⬌</div>
      </div>

      <div className='hero-overlay-static'>
         <h1 className='main-brand'>A&T HARMONIES</h1>
         <p className='brand-subtitle'>ONLINE MŰHELY</p>
      </div>

      {/* 2. "KI VAGYOK ÉN" - A KÉPRŐL MÁSOLVA SZÓRÓL SZÓRA */}
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
            <p>
            Minden alkotásom spirituális és tudományos értékkel bír, és arra született, hogy viselőjét támogassa a mindennapokban, miközben esztétikailag örömet nyújt.
            </p>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;