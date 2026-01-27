import React, { useState, useEffect } from 'react';
import './ShopPage.css';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Hiba:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='shop-container'>
      <div className='shop-header'>
        <h1>TUDATOS ESZKÖZÖK</h1>
        <p>Minden termék egyedi energetikai kódolással készül.</p>
      </div>

      <div className='shop-grid'>
        {loading ? <p style={{color:'white'}}>Termékek betöltése az adatbázisból...</p> : (
          products.length > 0 ? products.map(item => (
            <div className='shop-card' key={item._id}>
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
          )) : <p style={{color:'white'}}>Még nincsenek feltöltött termékek. Használd az Admin panelt!</p>
        )}
      </div>
    </div>
  );
}

export default ShopPage;