import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNav = (page) => {
    setPage(page);
    setIsOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          
          {/* HAMBURGER MENÜ IKON */}
          <div className='menu-icon' onClick={toggleMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>

          {/* LOGÓ - VISSZAVISZ A FŐOLDALRA */}
          <div className='nav-logo' onClick={() => setPage('home')}>
            A&T HARMONIES
          </div>

          {/* KOSÁR IKON (DEMO) */}
          <div className='cart-icon'>🛒</div>
        </div>
      </nav>

      {/* --- OLDALSÓ MENÜ (SIDEBAR) --- */}
      {/* Sötét háttér, ha nyitva van */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      
      {/* Maga a menü doboz */}
      <div className={`sidebar-menu ${isOpen ? 'active' : ''}`}>
        
        {/* FEJLÉC: Réz háttérrel */}
        <div className='sidebar-header'>
           <span className='menu-title'>MŰHELY MENÜ</span>
           <span className='close-btn' onClick={toggleMenu}>&times;</span>
        </div>
        
        {/* MENÜPONTOK LISTÁJA */}
        <ul className='sidebar-links'>
          <li onClick={() => handleNav('shop')}>Termékek</li>
          <li onClick={() => handleNav('orgon-info')}>Orgon Generátorok</li>
          <li onClick={() => handleNav('aszf')}>ÁSZF</li>
          <li onClick={() => handleNav('about')}>Ki vagyok</li>
          <li onClick={() => handleNav('contact')}>Kapcsolat</li>
        </ul>
        
        {/* LÁBLÉC */}
        <div className='sidebar-footer'>
            <p>A&T Harmonies 2026</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;