import React from 'react';
import RealisticKeyboard from '../components/RealisticKeyboard.jsx';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h2 className="home-title">Bienvenido a PianoArmonia</h2>
        <div className="home-divider"></div>
        <p className="home-subtitle">
          Explora las escalas musicales y sus acordes en el piano interactivo.
        </p>
      </div>

      <div className="home-instructions">
        <p className="home-instruction-text">
          Selecciona una escala en el menú lateral para comenzar:
        </p>
        <div className="home-scales-grid">
          {['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'].map((note) => (
            <div key={note} className="home-scale-chip">
              <span className="home-scale-note">{note}</span>
              <span className="home-scale-modes">Mayor · Menor · Blues</span>
            </div>
          ))}
        </div>
      </div>

      <div className="home-piano-section">
        <h3 className="home-piano-label">Do Mayor — Tónica · Tercera · Quinta</h3>
        <div className="piano-container">
          <RealisticKeyboard highlightedNotes={['C4', 'E4', 'G4']} />
        </div>
      </div>
    </div>
  );
};

export default Home;
