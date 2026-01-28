import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setPage, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNav = (page) => {
    setPage(page);
    setIsOpen(false); // Bezárjuk a menüt kattintás után
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          
          {/* HAMBURGER GOMB (Bal oldalt) */}
          <div className='menu-icon' onClick={toggleMenu}>
            <div className={isOpen ? 'bar open' : 'bar'}></div>
            <div className={isOpen ? 'bar open' : 'bar'}></div>
            <div className={isOpen ? 'bar open' : 'bar'}></div>
          </div>

          {/* LOGÓ (Középen/Balra) */}
          <div className='nav-logo' onClick={() => setPage('home')}>
            A&T HARMONIES
          </div>

          {/* KOSÁR IKON (Jobb oldalt) - Demo */}
          <div className='cart-icon'>
             🛒
          </div>
        </div>
      </nav>

      {/* OLDALSÓ MENÜ (SLIDE-IN) */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      <div className={`sidebar-menu ${isOpen ? 'active' : ''}`}>
        <div className='sidebar-header'>
           MENÜ
           <span className='close-btn' onClick={toggleMenu}>&times;</span>
        </div>
        
        <ul className='sidebar-links'>
          <li onClick={() => handleNav('home')}>Kezdőlap</li>
          <li onClick={() => handleNav('shop')}>Webshop (Termékek)</li>
          <li onClick={() => handleNav('orgon-info')}>Orgon Generátorok</li>
          <li onClick={() => handleNav('about')}>Rólam / Ki vagyok</li>
          <li onClick={() => handleNav('contact')}>Kapcsolat</li>
        </ul>
        
        <div className='sidebar-footer'>
            <p>A&T Harmonies 2026</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;