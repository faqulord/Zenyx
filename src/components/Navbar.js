import React from 'react';
import './Navbar.css';

function Navbar({ setPage, currentPage }) {
  return (
    <div className='navbar'>
      <div className='nav-logo' onClick={() => setPage('home')}>
        A&T HARMONIES
      </div>
      <div className='nav-links'>
        <div 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`} 
            onClick={() => setPage('home')}>
            Kezdőlap
        </div>
        <div 
            className={`nav-item ${currentPage === 'shop' ? 'active' : ''}`} 
            onClick={() => setPage('shop')}>
            Webshop
        </div>
      </div>
    </div>
  );
}

export default Navbar;