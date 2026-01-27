import React from 'react';
import './ShopPage.css';

function ShopPage() {
  // ITT VANNAK A TERMÉKEK A KÉPEK ALAPJÁN, PROFI SZÖVEGGEL
  const products = [
    {
      id: 1,
      name: "Szent Arány – Tensor Gyűrű",
      category: "Térharmonizálás",
      desc: "Az eredeti Slim Spurling technológia alapján. A 144 MHz-es Sacred Cubit frekvencia harmonizálja a sejteket, semlegesíti a káros sugárzást és strukturálja a vizet.",
      price: "12.990 Ft",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=600" // Rézgyűrű jellegű
    },
    {
      id: 2,
      name: "Élet Fája – Orgonit Alátét",
      category: "Vízprogramozás",
      desc: "A szakrális geometria és az orgon energia egyesítése. Lazurit és Citrin kristályokkal tölti fel az ivóvizedet életerővel, miközben tisztítja a tér energiáit.",
      price: "18.500 Ft",
      image: "https://images.unsplash.com/photo-1596464716127-f9a862557965?auto=format&fit=crop&q=80&w=600" // Orgonit jellegű
    },
    {
      id: 3,
      name: "Empowerment Cubit Karperec",
      category: "Ékszer & Erő",
      desc: "Kézzel kovácsolt réz, amely a mentális tisztaságot és a belső erőt támogatja. Nem csak ékszer: egy energetikai pajzs a mindennapokban.",
      price: "14.900 Ft",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600" // Réz karkötő
    },
    {
      id: 4,
      name: "Vízspirál Hegyikristállyal",
      category: "Vízkezelés",
      desc: "Egyszerű, de zseniális. Akaszd a poharad szélére, és a spirál örvényenergiája a hegyikristály tisztaságával rendezi a víz molekuláris szerkezetét.",
      price: "5.500 Ft",
      image: "https://images.unsplash.com/photo-1567117534570-3866164f33b1?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 5,
      name: "Veyara – A Végtelen Fény Őrzője",
      category: "Amulett",
      desc: "Egyedi drótékszer, amely a végtelen áramlását szimbolizálja. A középpontban lévő kristály fókuszálja a szándékot és emeli a rezgésszintet.",
      price: "11.990 Ft",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 6,
      name: "Tritán – Az Ősi Szövetség",
      category: "Mestereszköz",
      desc: "Három frekvencia egyesülése egyetlen erőteljes eszközben. A haladó energetikai munkát végzők számára készült, meditációhoz és gyógyításhoz.",
      price: "24.990 Ft",
      image: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?auto=format&fit=crop&q=80&w=600" // Komplexebb réz forma
    },
    {
      id: 7,
      name: "Életfonat Karperec",
      category: "Ékszer",
      desc: "A DNS spiráljára emlékeztető fonat, amely összeköti a fizikai testet az éterikus mintázatokkal. Elegáns és hatásos.",
      price: "9.900 Ft",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 8,
      name: "Hematitos Rézspirál Karlánc",
      category: "Egyensúly",
      desc: "A réz vezetőképessége találkozik a hematit földelő erejével. Tökéletes választás, ha stabilitásra és nyugalomra vágysz.",
      price: "8.500 Ft",
      image: "https://images.unsplash.com/photo-1602752250055-56714a9083bc?auto=format&fit=crop&q=80&w=600" // Sötétebb köves ékszer
    }
  ];

  return (
    <div className='shop-container'>
      <div className='shop-header'>
        <h1>TUDATOS ESZKÖZÖK</h1>
        <p>
          "A természet mindent megadott nekünk a gyógyuláshoz, csak elfelejtettük használni."<br/>
          Minden eszköz kézzel készül, szakrális geometriai arányok alapján, a fizikai és energetikai jólét támogatására.
        </p>
      </div>

      <div className='shop-grid'>
        {products.map(item => (
          <div className='shop-card' key={item.id}>
            <div className='shop-img-box'>
              <img src={item.image} alt={item.name} />
              <span className='category-tag'>{item.category}</span>
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