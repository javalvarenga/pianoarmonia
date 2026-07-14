import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ScaleCollection from './pages/ScaleCollection.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal que muestra el layout con sidebar */}
        <Route path="/" element={<Layout />}>  
          {/* Página de inicio */}
          <Route index element={<Home />} />
          {/* Ruta dinámica para escala y modo */}
          <Route path="scale/:note/:mode" element={<ScaleCollection />} />
          {/* Redirección comodín a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;