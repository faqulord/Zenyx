import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <span className='footer-logo'>HARMÓNIA & TUDÁS</span>
      
      <div className='footer-links'>
        <a href="#aszf">ÁSZF</a>
        <a href="#adatvedelem">Adatvédelem</a>
        <a href="#kapcsolat">Kapcsolat</a>
        <a href="#szallitas">Szállítás</a>
      </div>

      <p className='copyright'>
        © 2026 Minden jog fenntartva. | Fejlesztette: [A Te Neved/Céged]
      </p>
    </div>
  );
}

export default Footer;