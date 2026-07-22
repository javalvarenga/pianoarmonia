import React from 'react';
import './Piano.css';
import RealisticKeyboard from './RealisticKeyboard.jsx';

const PianoRetro = ({ activeNotes = [] }) => {
  return (
    <div className="retro-piano-container">
      <div className="piano-keyboard-section">
        <h2>Piano Retro</h2>
        <p>Haz clic en las teclas para tocar notas</p>
        <RealisticKeyboard highlightedNotes={activeNotes} />
      </div>
    </div>
  );
};

export default PianoRetro;
