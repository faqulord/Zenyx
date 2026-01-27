// ... importok ...

function HeroSection() {
  
  // Ez a függvény kezeli a görgetést
  const scrollToContent = () => {
    const element = document.getElementById('tudastar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <h1 className='hero-title'>AZ ŐSI TUDÁS ÉBREDÉSE</h1>
        <p className='hero-subtitle'>
          Fedezd fel a szakrális geometria és a kozmikus rend rejtett összefüggéseit.
          Lépj be a tudatosság új dimenziójába.
        </p>
        
        {/* Itt hívjuk meg a görgetést */}
        <button className='hero-btn' onClick={scrollToContent}>
          BELÉPÉS A TUDÁSTÁRBA
        </button>
      </div>
    </div>
  );
}

export default HeroSection;