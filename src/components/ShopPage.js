import React from 'react';
import './ShopPage.css';

function ShopPage() {
  // AZ ÖSSZES TERMÉK A KÉPEKRŐL
  const manualProducts = [
    {
      id: 1,
      name: "Szív Tér Harmonizáló Orgon",
      price: "14.990 Ft",
      image: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600",
      desc: "Rózsakvarccal és triskelion spirállal. A szív terére és az érzelmi egyensúlyra hangolva. Segít megnyitni a szívteret anélkül, hogy túlterhelne."
    },
    {
      id: 2,
      name: "Gaia Magja – Orgon Generátor",
      price: "16.500 Ft",
      image: "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600",
      desc: "Lost Cubit tensor gyűrűvel és citrinnel. Földel, nyugtat, és stabilizálja a teret. Az alkímiai Föld szimbólum segít lehorgonyozni az energiákat."
    },
    {
      id: 3,
      name: "Tritán – A Három Frekvencia Ősi Szövetsége",
      price: "13.000 Ft",
      image: "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600", // A kézben tartott 3 gyűrűs kép
      desc: "Három egymásba fonódó tensor gyűrű, amely egyesíti a szakrális frekvenciákat. Erősíti az aurát és harmonizálja a környezetet."
    },
    {
        id: 4,
        name: "Hegyi kristály rézspirálban",
        price: "6.000 Ft",
        image: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600", // Ideiglenes kép (a medálosat használd majd!)
        desc: "Tiszta hegyikristály csúcs, kézzel tekert rézspirálban, bőr szíjon. A kristály tisztítja a gondolatokat, a réz pedig vezeti az energiát."
    },
    {
        id: 5,
        name: "Empowerment Cubit Réz Karperec",
        price: "8.000 Ft",
        image: "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600",
        desc: "A belső erő és önbizalom frekvenciája. Kézzel sodort és kovácsolt vörösréz, amely viselés közben energetizálja a testet."
    },
    {
        id: 6,
        name: "Vizes pohárba akasztható rézspirál",
        price: "4.500 Ft", 
        image: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600", // Használd a megfelelő képet
        desc: "Strukturálja és energetizálja az ivóvizet. A spirál forma az élet áramlását és a teremtés örvényét szimbolizálja."
    }
  ];

  return (
    <div className='shop-container'>
      <div className='shop-intro'>
        <h2>TERMÉKEK</h2>
        <p>Kézzel készült eszközök a tudatosság szolgálatában.</p>
      </div>

      <div className='shop-grid-simple'>
        {manualProducts.map(product => (
          <div className='product-card-simple' key={product.id}>
            <div className='img-box'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='info-box'>
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <div className='price-simple'>{product.price}</div>
                <button className='btn-simple'>MEGRENDELEM</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;