import React from 'react';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';

const Piano = ({ scale, chord }) => {
  // Determinar color para las notas del acorde
  const getNoteColor = (note) => {
    // Colores para diferentes notas del acorde
    const colorMap = {
      'C': '#ff6b6b',
      'D': '#4ecdc4',
      'E': '#45b7d1',
      'F': '#96ceb4',
      'G': '#feca57',
      'A': '#ff9ff3',
      'B': '#54a0ff',
      'C#': '#ff6348',
      'D#': '#00d2d3',
      'F#': '#ff9f43',
      'G#': '#c44569',
      'A#': '#5f27cd',
    };
    
    return colorMap[note] || '#b58900';
  };

  return (
    <div className="piano-container">
      <h3 className="piano-title">Piano Interactivo</h3>
      <div className="piano-keyboard-section">
        <RetroKeyboard 
          scale={scale}
          chord={chord}
          getNoteColor={getNoteColor}
        />
      </div>
    </div>
  );
};

export default Piano;