import React from 'react';
import './ShopPage.css'; // Használjuk a Shop stílusait, mert az fehér

function OrgonInfo() {
  return (
    <div className='shop-container' style={{maxWidth: '800px', margin: '0 auto'}}>
      
      <div className='shop-intro'>
        <h2>Mire használják az orgon generátorokat?</h2>
        <div style={{height:'3px', width:'50px', background:'#b87333', margin:'10px auto'}}></div>
      </div>

      <div className='product-info' style={{textAlign: 'justify', lineHeight: '1.8'}}>
        
        <p><strong>Az orgon generátor nem gyógyászati eszköz</strong>, hanem egy térharmonizáló és tudatosságot támogató tárgy. Sokan használják:</p>
        
        <ul style={{listStyleType: 'circle', paddingLeft: '20px', marginBottom: '30px', color: '#555'}}>
            <li>otthon vagy munkahelyen a tér „megnyugtatására”</li>
            <li>alvás, pihenés vagy meditáció közelében</li>
            <li>víz strukturálásához (pohár alá helyezve)</li>
            <li>stresszes, elektromosan terhelt környezetben</li>
            <li>egyszerűen azért, mert érzik a jelenlétét támogató, kiegyensúlyozó hatásúnak</li>
        </ul>

        <h3 style={{fontFamily:'Playfair Display', fontSize:'1.5rem', color:'#b87333', marginTop:'40px'}}>Mi az az orgon generátor? – Közérthetően</h3>
        <p>
        Az orgon generátor egy olyan kézzel készített eszköz, amelynek célja a környezeti energiák rendezése és harmonizálása. 
        Alapelve szerint a térben jelen lévő kaotikus, szétszórt vagy feszültséget keltő energiákat összegyűjti, majd egy kiegyensúlyozottabb, nyugodtabb minőséggé alakítja át.
        </p>
        <p>
        Az orgon generátorok működése azon az elgondoláson alapul, hogy a környezetünk – akárcsak mi magunk – folyamatos energetikai kölcsönhatásban van mindennel, ami körülvesz bennünket.
        </p>

        <h3 style={{fontFamily:'Playfair Display', fontSize:'1.5rem', color:'#b87333', marginTop:'40px'}}>Hogyan érdemes hozzáállni?</h3>
        <p>
        Az orgon generátorok nem helyettesítenek semmilyen orvosi vagy hivatalos kezelést. Hatásuk sokaknál inkább finom, fokozatos és szubjektív módon jelenik meg: nyugodtabb térérzet, tisztább gondolkodás, kellemesebb légkör formájában.
        </p>
        <p>
        A legfontosabb elem a <strong>tudatos jelenlét</strong>. Ezek az eszközök akkor működnek a legjobban, ha nem várunk tőlük „csodát”, hanem partnerként tekintünk rájuk egy harmonikusabb környezet kialakításában.
        </p>
        
        <img 
            src="https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600" 
            alt="Orgon Generátorok" 
            style={{width: '100%', borderRadius: '8px', marginTop: '40px'}}
        />

      </div>
    </div>
  );
}

export default OrgonInfo;