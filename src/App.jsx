import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CollectionList from './components/CollectionList.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ScaleCollection from './pages/ScaleCollection.jsx';
import { collections } from './data/collections.js';

function CMayorScale() {
  // Filtrar solo la colección de Do Mayor
  const cMajorCollection = collections.filter(collection => collection.id === "c-major");
  
  return (
    <Layout>
      <div className="collections-container">
        <CollectionList data={cMajorCollection} />
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c-major" element={<CMayorScale />} />
        <Route path="/scale/:note" element={<ScaleCollection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;