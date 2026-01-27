import React from 'react';
import './ShopPage.css';

function ShopPage() {
  const products = [
    {
      id: 1,
      name: "Sacred Cubit Tensor Gyűrű",
      desc: "Slim Spurling technológiájával készült 144 MHz-es rezonancia gyűrű. Harmonizálja a vizet és a fizikai testet.",
      price: "12.990 Ft",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=600" // Hasonló rézgyűrű kép
    },
    {
      id: 2,
      name: "Élet Fája - Orgonit Alátét",
      desc: "Lazurit és Citrin kristályokkal, Tensor gyűrűvel. Vízstrukturáló és tértisztító hatású energetikai eszköz.",
      price: "18.500 Ft",
      image: "https://images.unsplash.com/photo-1596464716127-f9a862557965?auto=format&fit=crop&q=80&w=600" // Kristályos/Orgonit jellegű
    },
    {
      id: 3,
      name: "Empowerment Cubit Karperec",
      desc: "Kézzel kovácsolt, csavart réz karkötő. Az erő és a harmónia viselhető eszköze a mindennapokban.",
      price: "9.900 Ft",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600" // Réz ékszer
    },
    {
      id: 4,
      name: "Veyara - A Fény Őrzője",
      desc: "Egyedi drótékszer hegyikristállyal. A végtelen spirál és a tiszta kvarc erejével.",
      price: "14.990 Ft",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600" // Kristály medál
    },
    {
      id: 5,
      name: "Triskelion Vízstrukturáló",
      desc: "Zöld Lazurit kristályokkal. Ősi kelta szimbólum, amely rendezett szerkezetűvé alakítja a vizet.",
      price: "8.990 Ft",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600" // Zöldes kristály téma
    },
    {
      id: 6,
      name: "Vízspirál Hegyikristállyal",
      desc: "Pohár szélére akasztható rézspirál, amely a kristály rezgését közvetíti az ivóvízbe.",
      price: "5.500 Ft",
      image: "https://images.unsplash.com/photo-1567117534570-3866164f33b1?auto=format&fit=crop&q=80&w=600" // Réz és kristály
    }
  ];

  return (
    <div className='shop-container'>
      <div className='shop-header'>
        <h1>TUDATOS ESZKÖZÖK</h1>
        <p>
          Minden termék kézzel készül, szakrális geometriai arányok alapján, 
          a fizikai és energetikai jólét támogatására.
        </p>
      </div>

      <div className='shop-grid'>
        {products.map(item => (
          <div className='shop-card' key={item.id}>
            <div className='shop-img-box'>
              <img src={item.image} alt={item.name} />
            </div>
            <div className='shop-details'>
              <h3 className='shop-title'>{item.name}</h3>
              <p className='shop-desc'>{item.desc}</p>
              <div className='shop-price-row'>
                <span className='shop-price'>{item.price}</span>
                <button className='shop-btn'>KOSÁRBA</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;