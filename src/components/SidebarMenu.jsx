import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SidebarMenu.css';
import { collections } from '../data/collections.js';

/**
 * Componente SidebarMenu que renderiza la navegación lateral
 * basada en la estructura de niveles definida.
 */
const SidebarMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  
  // Crear un mapa de rutas basado en las colecciones
  const routeMap = collections.reduce((acc, collection) => {
    if (collection.route) {
      acc[`${collection.root}-${collection.type}`] = collection.route;
    }
    return acc;
  }, {});

  const handleMenuClick = (note, child) => {
    // Convertir a formato de colección
    const noteMap = {
      'DO': 'C',
      'RE': 'D',
      'MI': 'E',
      'FA': 'F',
      'SOL': 'G',
      'LA': 'A',
      'SI': 'B'
    };
    
    const qualityMap = {
      'Mayor': 'major-scale',
      'Menor': 'minor-scale'
    };
    
    const collectionKey = `${noteMap[note]}-${qualityMap[child]}`;
    
    if (routeMap[collectionKey]) {
      navigate(routeMap[collectionKey]);
    } else if (note === 'DO' && child === 'Mayor') {
      // Fallback para la implementación existente
      navigate('/c-major');
    }
    toggleMenu();
  };

  // Nota: En una implementación real, estos datos vendrían de src/data/menu.json
  const menuData = [
    { name: 'DO', children: ['Mayor', 'Menor'] },
    { name: 'RE', children: ['Mayor', 'Menor'] },
    { name: 'MI', children: ['Mayor', 'Menor'] },
    { name: 'FA', children: ['Mayor', 'Menor'] },
    { name: 'SOL', children: ['Mayor', 'Menor'] },
    { name: 'LA', children: ['Mayor', 'Menor'] },
    { name: 'SI', children: ['Mayor', 'Menor'] },
  ];

  // Estado para controlar qué menús están abiertos
  const [openMenus, setOpenMenus] = useState({});

  // Función para alternar la visibilidad de un menú
  const toggleSubMenu = (index) => {
    setOpenMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
                <span className="menu-text">{item.name}</span>
                <span className={`chevron-icon ${openMenus[index] ? 'open' : ''}`}>
                  ▼
                </span>
              </div>
              <div className={`menu-level-2-container ${openMenus[index] ? 'open' : ''}`}>
                {item.children.map((child, childIndex) => (
                  <div 
                    key={childIndex}
                    className="menu-level-2"
                    onClick={() => handleMenuClick(item.name, child)}
                  >
                    {child}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;