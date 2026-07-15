import React from 'react';
import Piano from '../components/Piano.jsx';

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
        <Piano scale="C major" chord="C" />
      </div>
    </div>
  );
};

export default Home;
