import React from 'react';
import { Chord } from 'tonal';

const ChordSelector = ({ currentChord, onChordChange }) => {
  // Obtener todos los acordes disponibles
  const chords = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];
  
  return (
    <div className="selector-container">
      <label htmlFor="chord-select">Acorde:</label>
      <select 
        id="chord-select"
        value={currentChord} 
        onChange={(e) => onChordChange(e.target.value)}
        className="selector vintage-selector"
      >
        {chords.map(chord => (
          <option key={chord} value={chord}>{chord}</option>
        ))}
      </select>
    </div>
  );
};

export default ChordSelector;