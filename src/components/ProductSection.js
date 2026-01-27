import React from 'react';
import './ProductSection.css';

function ProductSection() {
  // Demo termékek adatai
  const products = [
    {
      id: 1,
      category: "Eszközök",
      name: "Orgonit Piramis - Térharmonizáló",
      price: "15.990 Ft",
      image: "https://images.unsplash.com/photo-1567117534570-3866164f33b1?auto=format&fit=crop&q=80&w=400" // Kristály kép
    },
    {
      id: 2,
      category: "Könyvek",
      name: "Az Elveszett Civilizációk Nyomában",
      price: "6.490 Ft",
      image: "https://images.unsplash.com/photo-1544377892-aaf9b8656608?auto=format&fit=crop&q=80&w=400" // Antik könyv
    },
    {
      id: 3,
      category: "Ékszerek",
      name: "Szakrális Geometria Amulett",
      price: "8.990 Ft",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=400" // Arany medál
    },
    {
      id: 4,
      category: "Egészség",
      name: "Strukturált Víz Készítő",
      price: "24.990 Ft",
      image: "https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&q=80&w=400" // Víz/Üveg
    }
  ];

  return (
    <div className='products-container'>
      <h2 className='section-title'>KIEMELT AJÁNLATOK</h2>
      
      <div className='products-grid'>
        {products.map(product => (
          <div className='product-card' key={product.id}>
            <div className='product-image-container'>
              <img src={product.image} alt={product.name} className='product-image' />
            </div>
            <div className='product-info'>
              <span className='product-category'>{product.category}</span>
              <h3 className='product-title'>{product.name}</h3>
              <span className='product-price'>{product.price}</span>
              <button className='add-btn'>KOSÁRBA</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSection;