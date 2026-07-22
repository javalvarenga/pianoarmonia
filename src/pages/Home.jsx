import React from 'react';
import RealisticKeyboard from '../components/RealisticKeyboard.jsx';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Bienvenido a PianoArmonia</h2>
      <p>Explora las escalas musicales y sus acordes en el piano interactivo.</p>
      <p>Selecciona una escala en el menú lateral para comenzar:</p>
      <ul>
        <li>DO Mayor / Menor / Blues</li>
        <li>RE Mayor / Menor / Blues</li>
        <li>MI Mayor / Menor / Blues</li>
        <li>FA Mayor / Menor / Blues</li>
        <li>SOL Mayor / Menor / Blues</li>
        <li>LA Mayor / Menor / Blues</li>
        <li>SI Mayor / Menor / Blues</li>
      </ul>
      <div className="piano-container">
        <RealisticKeyboard highlightedNotes={['C4', 'E4', 'G4']} />
      </div>
    </div>
  );
};

export default Home;
