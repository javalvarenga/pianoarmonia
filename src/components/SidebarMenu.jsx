import React from 'react';
import './SidebarMenu.css';

/**
 * Componente SidebarMenu que renderiza la navegación lateral
 * basada en la estructura de niveles definida.
 */
const SidebarMenu = ({ isOpen, toggleMenu }) => {
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

  return (
    <aside className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Armonía</h2>
      </div>
      <nav className="menu-container">
        {menuData.map((item, index) => (
          <div key={`menu-sec-${index}`} className="menu-section">
            <div className="menu-level-1" onClick={toggleMenu}>
              {item.name}
            </div>
            <div className="menu-level-2-container">
              {item.children.map((child, childIndex) => (
                <div 
                  key={`menu-child-${childIndex}`} 
                  className="menu-level-2"
                  onClick={toggleMenu}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarMenu;