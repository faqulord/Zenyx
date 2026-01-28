import React from 'react';
import './HeroSection.css'; // A Hero CSS-t használjuk a rácshoz

function HomeProducts() {
  // CSAK A FŐOLDALI TERMÉKEK (MAGOK)
  const products = [
    {
      id: 1,
      name: "Viridis Flux",
      price: "14.990 Ft",
      img: "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600" // Zöld
    },
    {
      id: 2,
      name: "Gaia Magja",
      price: "16.500 Ft",
      img: "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600" // Föld
    },
    {
      id: 3,
      name: "Víz Magja",
      price: "14.990 Ft",
      img: "https://atharmonies.com/cdn/shop/files/20260113_171858_1.jpg?v=1768389544&width=1600" // Kék
    },
    {
      id: 4,
      name: "Levegő Magja",
      price: "14.990 Ft",
      img: "https://atharmonies.com/cdn/shop/files/20260114_122952.jpg?v=1768390629&width=1600" // Fehér
    },
    {
        id: 5,
        name: "111 Kapu",
        price: "12.500 Ft",
        img: "https://atharmonies.com/cdn/shop/files/20260113_171738.jpg?v=1768389113&width=1600" // 111
    },
    {
        id: 6,
        name: "Szív Tér Orgon",
        price: "14.990 Ft",
        img: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600" // Rózsakvarc
    }
  ];

  return (
    <div className='home-products-grid'>
      {products.map(p => (
        <div className='home-product-card' key={p.id}>
            <img src={p.img} alt={p.name} className='home-product-img' />
            <div className='home-product-info'>
                <h3>{p.name}</h3>
                <div className='home-price'>{p.price}</div>
                <button className='home-btn'>KOSÁRBA</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default HomeProducts;