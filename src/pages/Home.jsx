import React from 'react';
import Piano from '../components/Piano.jsx';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Bienvenido a PianoArmonia</h2>
      <p>Explora las escalas musicales y sus acordes en el piano interactivo.</p>
      <p>Selecciona una escala en el menú lateral para comenzar:</p>
      <ul>
        <li>DO Mayor / Menor</li>
        <li>RE Mayor / Menor</li>
        <li>MI Mayor / Menor</li>
        <li>FA Mayor / Menor</li>
        <li>SOL Mayor / Menor</li>
        <li>LA Mayor / Menor</li>
        <li>SI Mayor / Menor</li>
      </ul>
      <div className="piano-container">
        <Piano scale="C major" chord="C" />
      </div>
    </div>
  );
};

export default Home;