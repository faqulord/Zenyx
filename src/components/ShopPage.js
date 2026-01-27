import React, { useState, useEffect } from 'react';
import './ShopPage.css';

function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Lekérjük a termékeket a backendről
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Még nincsenek termékek az adatbázisban."));
  }, []);

  return (
    <div className='shop-container'>
      <div className='shop-header'>
        <h1>TUDATOS ESZKÖZÖK</h1>
        <p>Minden eszköz kézzel készül, szakrális geometriai arányok alapján.</p>
      </div>

      <div className='shop-grid'>
        {products.length > 0 ? products.map(item => (
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
        )) : (
          <div style={{color:'white', gridColumn: '1/-1', padding: '50px'}}>
             <h3>A termékek feltöltése folyamatban...</h3>
             <p>Holnap reggelre itt lesz az összes eszközöd!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;