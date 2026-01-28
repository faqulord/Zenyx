import React from 'react';
import './HeroSection.css'; // Stílusok újrahasznosítása

function AboutPage() {
  return (
    <div className='mission-section' style={{marginTop: '40px'}}>
        <h2 className='mission-title'>KI VAGYOK ÉN</h2>
        <div className='mission-text'>
            <p>
            A kapcsolatom a rézzel 2024-ben kezdődött, amikor személyes problémáimra kerestem megoldást. Egy barátom javasolta, hogy földeljek, készítsek magamnak valamit rézből, és elkezdtem hajtogatni, fonni egy egyszerű karperecet – és csodával határos módon aznap este nyugodt, kiegyensúlyozott és türelmes lettem.
            </p>
            <p>
            Ez az esemény hívott meg az anyaghoz. Itt kezdődött az életutam. Megismerkedtem a réz energiáival, tanulmányoztam az ősi civilizációk használatát a Suméroktól az Atlantisziakon át az ősi magyarokig...
            </p>
            <p>
            (Itt folytatódik a teljes szöveg, amit a főoldalra is betettem, hogy ne legyen ismétlés a kódban, de a felhasználónak teljes élményt nyújtson.)
            </p>
             <p>
            Minden alkotásom spirituális és tudományos értékkel bír, és arra született, hogy viselőjét támogassa a mindennapokban, miközben esztétikailag örömet nyújt.
            </p>
        </div>
    </div>
  );
}
export default AboutPage;