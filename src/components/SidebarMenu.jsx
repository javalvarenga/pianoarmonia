import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SidebarMenu.css';
import menuData from '../data/menu.json';

/**
 * Componente SidebarMenu que renderiza la navegación lateral
 * basada en la estructura de niveles definida.
 */
const SidebarMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  
  // Estado para controlar qué menús están abiertos
  const [openMenus, setOpenMenus] = useState({});

  // Función para alternar la visibilidad de un menú
  const toggleSubMenu = (index) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleMenuClick = (note, child) => {
    // Convertir a formato de ruta
    const noteMap = {
      'DO': 'do',
      'RE': 're',
      'MI': 'mi',
      'FA': 'fa',
      'SOL': 'sol',
      'LA': 'la',
      'SI': 'si'
    };
    
    const routeNote = noteMap[note];
    
    if (routeNote) {
      // Construir la ruta como /scale/${routeNote}/${child.quality}
      navigate(`/scale/${routeNote}/${child.quality}`);
    }
  };

  return (
    <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Escalas
          </Link>
        </h2>
      </div>
      <nav className="menu-container">
        <ul>
          {menuData.map((item, index) => (
            <li key={index} className="menu-section">
              <div 
                className="menu-level-1"
                onClick={() => toggleSubMenu(index)}
              >
                <span className="menu-text">{item.note}</span>
                <span className={`chevron-icon ${openMenus[index] ? 'open' : ''}`}>
                  ▼
                </span>
              </div>
              {openMenus[index] && (
                <ul className="submenu">
                  {item.submenus.map((child, childIndex) => (
                    <li 
                      key={childIndex} 
                      className="menu-level-2"
                      onClick={() => handleMenuClick(item.note, child)}
                    >
                      <span className="menu-text">{child.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;