import React, { useState } from 'react';
import './ShopPage.css';

const ProductGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation(); // Hogy ne kattintson a termékre lapozáskor
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
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
  const manualProducts = [
    {
      id: 1,
      name: "Viridis Flux – (Víz-Szív-Megújulás)",
      price: "14.990 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Zöld lazurit és aventurin. A szív természetes regenerációjára hangolva."
    },
    {
      id: 2,
      name: "Gaia Magja – Föld Minőség",
      price: "16.500 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Lost Cubit tensor gyűrűvel és citrinnel. Földel, nyugtat, és stabilizálja a teret."
    },
    {
      id: 3,
      name: "Víz Magja – Víz Minőség",
      price: "14.990 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_171858_1.jpg?v=1768389544&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Az áramlás és tisztulás ereje. Kék színvilág."
    },
    {
      id: 4,
      name: "Levegő Magja – Levegő Minőség",
      price: "14.990 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260114_122952.jpg?v=1768390629&width=1600",
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Tisztaság és szellemi fókusz. A levegő elem könnyedségét segíti."
    },
    {
      id: 5,
      name: "111 Kapu – Tudatindító Kód",
      price: "12.500 Ft",
      images: [
           "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600" 
      ],
      desc: "A teremtés kapuja. A 111-es számmisztikai kód."
    },
    {
      id: 6,
      name: "Tritán – A Három Frekvencia",
      price: "13.000 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600",
          "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600"
      ],
      desc: "Három egymásba fonódó tensor gyűrű."
    }
  ];

  const handleBuy = (productName) => {
    alert(productName + " bekerült a kosárba! (Demo)");
  };

  return (
    <div className='shop-container'>
      <div className='shop-intro'>
        <h2>MŰHELY TERMÉKEK</h2>
        <div style={{height:'3px', width:'50px', background:'#b87333', margin:'10px auto'}}></div>
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
                <button 
                    className='btn-simple'
                    onClick={() => handleBuy(product.name)}
                >
                    MEGRENDELEM
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;