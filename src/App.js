import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection'; // Ezt adtuk hozzá

function App() {
  return (
    <div className="App">
      <HeroSection />
      <ContentSection /> {/* Itt jelenítjük meg az új részt */}
    </div>
  );
}

export default App;