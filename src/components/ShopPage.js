import React, { useState } from 'react';
import './ShopPage.css';

const ProductGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = (e) => { e.stopPropagation(); setCurrent(current === images.length - 1 ? 0 : current + 1); };
  const prevSlide = (e) => { e.stopPropagation(); setCurrent(current === 0 ? images.length - 1 : current - 1); };

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
        {images.map((_, idx) => (<span key={idx} className={idx === current ? 'dot active' : 'dot'}></span>))}
      </div>
    </div>
  );
};

function ShopPage() {
  // A WEBSHOP TELJES KÍNÁLATA (A KÉPEK ALAPJÁN)
  const manualProducts = [
    // --- ÉKSZEREK ---
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
          "KÉP_LINK_IDE_MEDÁLHOZ" // Ide tedd a medálos képet!
      ],
      desc: "Tiszta hegyikristály csúcs, kézzel tekert rézspirálban, bőr szíjon. A kristály tisztítja a gondolatokat, a réz pedig vezeti az energiát."
    },
    {
      id: 104,
      name: "Vizes pohárba akasztható rézspirál",
      price: "Kérj árat",
      images: [
          "KÉP_LINK_IDE_SPIRÁLHOZ" // A poharas kép
      ],
      desc: "Ez a kézzel készített réz gyűrű az ősi egyiptomi szakrális mértékrend energiáját követi. Spirál formája az élet áramlását szimbolizálja. Nem csupán ékszer – energetikai erőtér."
    },
    {
      id: 105,
      name: "Szent Arány – Tensor Gyűrű",
      price: "Kérj árat",
      images: ["KÉP_LINK_IDE"],
      desc: "Kézzel font tensor gyűrű a szakrális geometria alapján."
    },
    {
        id: 106,
        name: "Életfonat – Kézzel sodort réz karperec",
        price: "Kérj árat",
        images: ["KÉP_LINK_IDE"],
        desc: "Kézzel sodort, egyedi mintázatú réz karperec."
    },
    
    // --- POHÁRALÁTÉTEK ---
    {
        id: 201,
        name: "Vízstrukturáló poháralátét – Ametiszt",
        price: "Kérj árat",
        images: ["KÉP_LINK_IDE"], 
        desc: "Ametiszt, Lost Cubit és a víz szent szimbóluma. Harmonizálja az italt."
    },
    {
        id: 202,
        name: "Vízstrukturáló poháralátét – Kék Kvarc",
        price: "Kérj árat",
        images: ["KÉP_LINK_IDE"],
        desc: "Kék kvarckristály, Lost Cubit tensor és Triskelioni víz szimbólum."
    },
    {
        id: 203,
        name: "Élet fája – Energetikai poháralátét",
        price: "Kérj árat",
        images: ["KÉP_LINK_IDE"],
        desc: "Élet fája motívum, Lazurit, Citrin és Tensor gyűrűk harmóniája."
    },
    {
        id: 204,
        name: "Zöld Lazurit Triskelion Alátét",
        price: "Kérj árat",
        images: ["KÉP_LINK_IDE"],
        desc: "Tensor vízstrukturáló poháralátét, 6 cm."
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
                {/* Ha nincs kép, egy alap képet mutat, hogy ne legyen üres */}
                <ProductGallery images={product.images[0] === "KÉP_LINK_IDE" ? ["https://via.placeholder.com/300?text=Feltöltés+Alatt"] : product.images} />
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