import React from 'react';
import './ShopPage.css';

function OrgonInfo() {
  return (
    <div className='shop-container' style={{maxWidth: '800px', margin: '0 auto', background:'#fff', padding:'20px'}}>
      
      <div className='shop-intro'>
        <h2>Orgon Generátorok és Orgonitok tájékoztatás</h2>
        <div style={{height:'3px', width:'60px', background:'#b87333', margin:'10px auto'}}></div>
      </div>

      <img 
        src="https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600" 
        alt="Orgonitok" 
        style={{width:'100%', borderRadius:'8px', marginBottom:'30px'}} 
      />

      <div className='product-info' style={{textAlign: 'justify', lineHeight: '1.8', color:'#333'}}>
        
        <h3>Mi az az orgon generátor? – Közérthetően</h3>
        <p>
        Az orgon generátor egy olyan kézzel készített eszköz, amelynek célja a környezeti energiák rendezése és harmonizálása. 
        Alapelve szerint a térben jelen lévő kaotikus, szétszórt vagy feszültséget keltő energiákat összegyűjti, majd egy kiegyensúlyozottabb, nyugodtabb minőséggé alakítja át.
        </p>

        <h3>Miből áll egy orgon generátor?</h3>
        <p>Egy orgon generátor általában több rétegből épül fel, amelyek együtt, egymást erősítve működnek:</p>
        <ul>
            <li><strong>Fémek:</strong> (pl. réz, fém por) – összegyűjtik és földelik az energiát.</li>
            <li><strong>Kristályok:</strong> (pl. hegyikristály) – tisztítják és harmonizálják.</li>
            <li><strong>Ásványok és Szimbólumok:</strong> (pl. rózsakvarc, triskelion) – irányt adnak a működésnek.</li>
        </ul>

        <h3>Mire használják?</h3>
        <p>Az orgon generátor nem gyógyászati eszköz, hanem egy térharmonizáló tárgy. Sokan használják:</p>
        <ul>
            <li>otthon vagy munkahelyen a tér „megnyugtatására”</li>
            <li>alvás, pihenés vagy meditáció közelében</li>
            <li>víz strukturálásához (pohár alá helyezve)</li>
            <li>stresszes környezetben</li>
        </ul>

        <p style={{marginTop:'30px', fontStyle:'italic', color:'#777'}}>
            "A legfontosabb elem a tudatos jelenlét. Ezek az eszközök akkor működnek a legjobban, ha partnerként tekintünk rájuk."
        </p>

      </div>
    </div>
  );
}

export default OrgonInfo;