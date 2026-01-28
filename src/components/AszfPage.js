import React from 'react';
import './ShopPage.css'; // Használjuk a shop stílusait az egyszerűségért

function AszfPage() {
  return (
    <div className='shop-container' style={{maxWidth: '900px', margin: '0 auto', background:'#fff', padding:'40px 20px'}}>
      
      <div className='shop-intro'>
        <h2>Általános Szerződési Feltételek (ÁSZF)</h2>
        <p>A&T Harmonies - Takács Attila</p>
        <div style={{height:'2px', width:'100%', background:'#eee', margin:'20px 0'}}></div>
      </div>

      <div className='product-info' style={{textAlign: 'left', lineHeight: '1.6', color:'#333'}}>
        
        <h3>1. Üzemeltető adatai</h3>
        <p>
            <strong>Név:</strong> Takács Attila<br/>
            <strong>Adószám:</strong> 914422259-1-36<br/>
            <strong>E-mail:</strong> takacsattila0@gmail.com<br/>
            A vállalkozás egyéni vállalkozásként működik kézműves, egyedi készítésű termékek értékesítésére.
        </p>

        <h3>2. Alapvető rendelkezések</h3>
        <p>Jelen ÁSZF a weboldalon keresztül történő vásárlásokra érvényes. A megrendeléssel a vásárló kijelenti, hogy elolvasta és elfogadta az ÁSZF-et, továbbá betartja a webshop használatára vonatkozó szabályokat.</p>

        <h3>3. Termékek jellege</h3>
        <ul style={{listStyle:'disc', paddingLeft:'20px', marginBottom:'15px'}}>
            <li>kézzel készített és energetikai jellegű dísztárgyak</li>
            <li>egyedi készítésű réz ékszerek</li>
            <li>természetes ásványokkal készült darabok</li>
        </ul>
        <p><strong>Fontos:</strong> Minden darab egyedi, ezért kisebb méret- és formabeli eltérések előfordulhatnak. A termékek nem minősülnek gyógyászati eszköznek, nem helyettesítik az orvosi kezelést.</p>

        <h3>4. Vásárlás menete</h3>
        <ol style={{paddingLeft:'20px', marginBottom:'15px'}}>
            <li>Termék kiválasztása és kosárba helyezése</li>
            <li>Szállítási és számlázási adatok megadása</li>
            <li>Fizetési mód kiválasztása</li>
            <li>Rendelés visszaigazolása e-mailben</li>
        </ol>

        <h3>5. Fizetési módok</h3>
        <ul>
            <li>Banki átutalás</li>
            <li>Bankkártyás fizetés</li>
            <li>Utánvét</li>
        </ul>

        <h3>6. Szállítás</h3>
        <p>Szállítási mód: Futárszolgálat.<br/>Szállítási idő: 3–10 munkanap, egyedi megrendelés esetén hosszabb lehet.</p>

        <h3>7. Elállási jog</h3>
        <p>A vásárló a termék kézhezvételétől 14 napon belül indoklás nélkül elállhat. Kivétel: egyedileg, személyre szabottan készült termékek. A visszaküldés költsége a vásárlót terheli.</p>

        <h3>8. Garancia és reklamáció</h3>
        <p>Kézműves termékek esetén gyártási hibára 6 hónap jótállás jár. Nem tartozik jótállás alá a természetes kopás (patina) vagy a helytelen használat.</p>

        <h3>9. Adatkezelés és Szerzői jogok</h3>
        <p>A webáruház az adatokat bizalmasan kezeli. A termékek formatervei, képek és szövegek szerzői jogi védelem alatt állnak.</p>

        <p style={{marginTop:'30px', fontSize:'0.9rem', color:'#777'}}>Jelen ÁSZF 2026. január 28-tól érvényes visszavonásig.</p>
      </div>
    </div>
  );
}

export default AszfPage;