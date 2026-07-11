import React from 'react';
import './HamburgerMenu.css';

/**
 * Componente HamburgerMenu para controlar la visibilidad del sidebar
 * en dispositivos móviles.
 */
const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <button 
      className={`hamburger-menu ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-label="Abrir menú de navegación"
      aria-expanded={isOpen}
    >
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
    </button>
  );
};

export default HamburgerMenu;