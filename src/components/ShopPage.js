import React, { useState } from 'react';
import './ShopPage.css';

// Képgaléria komponens (Swipe)
const ProductGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className='product-gallery-slider'>
      {images.length > 1 && (
        <>
            <button className='gallery-btn left' onClick={prevSlide}>&#10094;</button>
            <button className='gallery-btn right' onClick={nextSlide}>&#10095;</button>
        </>
      )}
      <img src={images[current]} alt="Termék" className='gallery-main-img' />
      <div className='gallery-dots'>
        {images.map((_, idx) => (
            <span key={idx} className={idx === current ? 'dot active' : 'dot'}></span>
        ))}
      </div>
    </div>
  );
};

function ShopPage() {
  // A PONTOS TERMÉKLISTA A KÉPEK ALAPJÁN
  const manualProducts = [
    {
      id: 1,
      name: "Viridis Flux – (Víz-Szív-Megújulás)",
      price: "14.990 Ft",
      // Zöld spirálos kép
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Zöld lazurit és aventurin. A szív természetes regenerációjára hangolva. Arany színű triskelion szimbólummal."
    },
    {
      id: 2,
      name: "Gaia Magja – Föld Minőség",
      price: "16.500 Ft",
      // Barna/Arany háromszöges kép
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Lost Cubit tensor gyűrűvel és citrinnel. Földel, nyugtat, és stabilizálja a teret. Az alkímiai Föld szimbólummal."
    },
    {
      id: 3,
      name: "Víz Magja – Víz Minőség",
      price: "14.990 Ft",
      // Kék kép
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_171858_1.jpg?v=1768389544&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Az áramlás és tisztulás ereje. Kék színvilág, amely a víz elem nyugalmát és alkalmazkodó képességét hordozza."
    },
    {
      id: 4,
      name: "Levegő Magja – Levegő Minőség",
      price: "14.990 Ft",
      // Fehér/Átlátszó kép
      images: [
          "https://atharmonies.com/cdn/shop/files/20260114_122952.jpg?v=1768390629&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Tisztaság és szellemi fókusz. A levegő elem könnyedségét és a gondolatok tisztaságát segíti elő."
    },
    {
      id: 5,
      name: "111 Kapu – Tudatindító Kód",
      price: "12.500 Ft",
      // Fekete 111-es kép
      images: [
           "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600" // Cseréld, ha van direkt link a feketéhez, most a csoportképet tettem 2.-nak
      ],
      desc: "A teremtés kapuja. A 111-es számmisztikai kód segít összehangolódni az új kezdetek energiájával."
    },
    {
      id: 6,
      name: "Tritán – A Három Frekvencia",
      price: "13.000 Ft",
      // A 3 karikás kép
      images: [
          "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600",
          "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600"
      ],
      desc: "Három egymásba fonódó tensor gyűrű, amely egyesíti a szakrális frekvenciákat. Erősíti az aurát."
    }
  ];

  return (
    <div className='shop-container'>
      <div className='shop-intro'>
        <h2>MŰHELY TERMÉKEK</h2>
        <div style={{height:'3px', width:'50px', background:'#b87333', margin:'10px auto'}}></div>
        <p>Kattints a képre a részletekért!</p>
      </div>

      <div className='shop-grid-simple'>
        {manualProducts.map(product => (
          <div className='product-card-simple' key={product.id}>
            <div className='img-box'>
                <ProductGallery images={product.images} />
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