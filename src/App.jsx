import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CollectionList from './components/CollectionList.jsx';
import SidebarMenu from './components/SidebarMenu.jsx';
import { collections } from './data/collections.js';

function Home() {
  return (
    <div className="app-layout">
      <SidebarMenu />
      <div className="app-main-content">
        <header>
          <h1 className="app-header">PianoArmonia</h1>
        </header>
        <main>
          <div className="collections-container">
            <CollectionList data={collections} />
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;