import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu.jsx';
import SidebarMenu from './SidebarMenu.jsx';
import '../index.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <HamburgerMenu isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
      <SidebarMenu isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
      <div className="app-main-content">
        <header>
          <h1 className="app-header">PianoArmonia</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;