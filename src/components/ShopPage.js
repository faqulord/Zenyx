import React, { useState } from 'react';
import './ShopPage.css';

const ProductGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = (e) => { 
    e.stopPropagation(); 
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
      {/* Ha véletlenül nincs kép, egy placeholder jelenik meg, hogy ne omoljon össze */}
      <img src={images[current] || "https://via.placeholder.com/300"} alt="Termék" className='gallery-main-img' />
      
      <div className='gallery-dots'>
        {images.map((_, idx) => (
            <span key={idx} className={idx === current ? 'dot active' : 'dot'}></span>
        ))}
      </div>
    </div>
  );
};

function ShopPage() {
  // A TERMÉKEK LISTÁJA
  const manualProducts = [
    {
      id: 101,
      name: "Tritán – A Három Frekvencia Ősi Szövetsége",
      price: "13.000 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600"
      ],
      desc: "Három egymásba fonódó tensor gyűrű, amely egyesíti a szakrális frekvenciákat. Erősíti az aurát és harmonizálja a környezetet."
    },
    {
      id: 102,
      name: "Empowerment Cubit Réz Karperec",
      price: "8.000 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600"
      ],
      desc: "A belső erő, stabilitás, önbizalom és életenergia felébresztéséhez kapcsolódik. Kézzel kovácsolva."
    },
    {
      id: 103,
      name: "Hegyi kristály rézspirálban",
      price: "6.000 Ft",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600"
      ],
      desc: "Tiszta hegyikristály csúcs, kézzel tekert rézspirálban, bőr szíjon. A kristály tisztítja a gondolatokat."
    },
    {
      id: 104,
      name: "Vizes pohárba akasztható rézspirál",
      price: "Kérj árat",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600"
      ],
      desc: "Ez a kézzel készített réz gyűrű az ősi egyiptomi szakrális mértékrend energiáját követi. Spirál formája az élet áramlását szimbolizálja."
    },
    {
      id: 105,
      name: "Szent Arány – Tensor Gyűrű",
      price: "Kérj árat",
      images: [
          "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600"
      ],
      desc: "Kézzel font tensor gyűrű a szakrális geometria alapján."
    },
    {
        id: 106,
        name: "Életfonat – Kézzel sodort réz karperec",
        price: "Kérj árat",
        images: [
            "https://atharmonies.com/cdn/shop/files/20251028_104826.jpg?v=1762331002&width=1600"
        ],
        desc: "Kézzel sodort, egyedi mintázatú réz karperec."
    },
    {
        id: 201,
        name: "Vízstrukturáló poháralátét – Ametiszt",
        price: "Kérj árat",
        images: [
            "https://atharmonies.com/cdn/shop/files/20260113_171858_1.jpg?v=1768389544&width=1600"
        ], 
        desc: "Ametiszt, Lost Cubit és a víz szent szimbóluma. Harmonizálja az italt."
    },
    {
        id: 202,
        name: "Vízstrukturáló poháralátét – Kék Kvarc",
        price: "Kérj árat",
        images: [
            "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600"
        ],
        desc: "Kék kvarckristály, Lost Cubit tensor és Triskelioni víz szimbólum."
    }
  ];

  const handleBuy = (productName) => {
    alert(productName + " bekerült a kosárba! (Demo)");
  };

  return (
    <div className='shop-container'>
      <div className='shop-intro'>
        <h2>TERMÉKEK</h2>
        <div style={{height:'3px', width:'50px', background:'#b87333', margin:'10px auto'}}></div>
        <p>Egyedi, kézzel készült energetikai eszközök.</p>
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