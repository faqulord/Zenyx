import React from 'react';
import './ShopPage.css';

function ShopPage() {
  // EZEK AZ EREDETI TERMÉKEI A LEÍRÁSOKKAL
  const manualProducts = [
    {
      id: 1,
      name: "Szív Tér Harmonizáló Orgon",
      price: "14.990 Ft", // Ár példa (javítsd ha más)
      image: "https://atharmonies.com/cdn/shop/files/20260114_123047.jpg?v=1768392509&width=1600",
      desc: `Ezt az orgon generátort a szív terére és az érzelmi egyensúlyra hangoltam. A felső rétegben rózsakvarc kapott helyet, amely számomra a szeretet, az elfogadás és az érzelmi gyógyulás kristálya. Lágy, mégis mély rezgést hordoz, amely segít megnyitni a szívteret anélkül, hogy túlterhelne.

A rózsakvarc tetején megjelenő triskelioni yin–yang spirál az érzelmek kettősségét és körforgását jelképezi: adás és befogadás, sebezhetőség és erő, női és férfi minőség egyensúlyát. Ez a forma számomra azt üzeni, hogy a szív akkor stabil, ha nem zár el, de nem is árad túl — hanem ritmusban marad.

Az alsó rétegben lévő fém por és zúzott hegyikristály gondoskodik arról, hogy ez a finom érzelmi minőség ne lebegjen el. A fémek összegyűjtik és lehorgonyozzák az energiát, míg a hegyikristály tisztán továbbítja és visszaforgatja azt a rendszerbe.`
    },
    {
      id: 2,
      name: "Gaia Magja – Orgon Generátor",
      price: "16.500 Ft",
      image: "https://atharmonies.com/cdn/shop/files/20260113_172032.jpg?v=1768387309&width=1600",
      desc: `Ezt az orgon generátort úgy készítettem, hogy az anyagok ne külön-külön dolgozzanak, hanem egy közös rendszerként erősítsék egymást.
A középpontban a Lost Cubit tensor gyűrű helyezkedik el, amely a teret finoman tisztítja, tágítja, és segít feloldani a zavaró, szétesett energiákat. Erre a mezőre hangolódik rá a citrin, amely életenergiát, tiszta szándékot és teremtő minőséget hoz be a rendszerbe.

Az egész szerkezetet az alkímiai Föld szimbólum fogja össze. Számomra ez nem díszítés, hanem egy kulcs: segít abban, hogy az energia ne „elszálljon”, hanem lehorgonyzódjon a fizikai térben. Amit ez az eszköz létrehoz, az nem elvont rezgés, hanem stabil, megtartó jelenlét.

Az alsó rétegben lévő nehézfém por és zúzott hegyikristály együtt dolgozik: összegyűjtik a környezeti kaotikus és negatív energiákat, amit a hegyikristály tisztít és rendezett módon továbbítja azokat felfelé a rendszerbe.`
    },
    {
        id: 3,
        name: "Empowerment Cubit Réz Karperec",
        price: "8.000 Ft",
        image: "https://atharmonies.com/cdn/shop/files/20251007_154705.jpg?v=1761291463&width=1600",
        desc: "Kézzel kovácsolt, tiszta vörösréz karperec. Az Empowerment Cubit frekvenciája hagyományosan a belső erő, stabilitás, önbizalom és életenergia felébresztéséhez kapcsolódik. A tiszta réz spirális sodrása az életáram energiaörvénylését követi, majd kézi kovácsolással aktiválódik – így a forma a szándéktól, az érintéstől és a tűz elemétől válik élővé."
    }
  ];

  return (
    <div className='shop-container'>
      <div className='shop-intro'>
        <h2>A MŰHELYBŐL</h2>
        <p>Minden darab kézzel készül, egyedi energetikai hangolással.</p>
      </div>

      <div className='shop-list'>
        {manualProducts.map(product => (
          <div className='product-card-white' key={product.id}>
            <div className='product-img-wrapper'>
                <img src={product.image} alt={product.name} />
            </div>
            <div className='product-info'>
                <h3>{product.name}</h3>
                <div className='product-desc'>
                    {/* A sortörések kezelése */}
                    {product.desc.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                <div className='price-row'>
                    <span className='price-tag'>{product.price}</span>
                    <button className='buy-btn'>KOSÁRBA TESZEM</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;