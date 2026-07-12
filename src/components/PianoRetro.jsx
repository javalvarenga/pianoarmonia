import React, { useState, useCallback } from 'react';
import './Piano.css';
import Piano from './Piano.js';

const PianoRetro = ({ activeNotes = [] }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // Notas del piano (2 octavas completas)
  const notes = [
    { note: 'C', type: 'white', position: 0 },
    { note: 'C#', type: 'black', position: 0.5 },
    { note: 'D', type: 'white', position: 1 },
    { note: 'D#', type: 'black', position: 1.5 },
    { note: 'E', type: 'white', position: 2 },
    { note: 'F', type: 'white', position: 3 },
    { note: 'F#', type: 'black', position: 3.5 },
    { note: 'G', type: 'white', position: 4 },
    { note: 'G#', type: 'black', position: 4.5 },
    { note: 'A', type: 'white', position: 5 },
    { note: 'A#', type: 'black', position: 5.5 },
    { note: 'B', type: 'white', position: 6 },
    { note: 'C', type: 'white', position: 7 },
    { note: 'C#', type: 'black', position: 7.5 },
    { note: 'D', type: 'white', position: 8 },
    { note: 'D#', type: 'black', position: 8.5 },
    { note: 'E', type: 'white', position: 9 },
    { note: 'F', type: 'white', position: 10 },
    { note: 'F#', type: 'black', position: 10.5 },
    { note: 'G', type: 'white', position: 11 },
    { note: 'G#', type: 'black', position: 11.5 },
    { note: 'A', type: 'white', position: 12 },
    { note: 'A#', type: 'black', position: 12.5 },
    { note: 'B', type: 'white', position: 13 },
    { note: 'C', type: 'white', position: 14 },
  ];

  // Determinar color para una nota basada en los acordes activos
  const getNoteColor = useCallback((note) => {
    if (!activeNotes.includes(note)) return '';
    
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
  }, [activeNotes]);

  const handleKeyDown = (note) => {
    setPressedKeys(prev => new Set(prev).add(note));
  };

  const handleKeyUp = (note) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  };

  return (
    <div className="piano-wrapper">
      <div className="piano-keyboard-section">
        <h2>Piano Retro</h2>
        <p>Haz clic en las teclas para tocar notas</p>
        <div className="piano-retro">
          <div className="piano-keys">
            {notes.map((key, index) => {
              const isActive = pressedKeys.has(key.note);
              const isColored = activeNotes.includes(key.note);
              const backgroundColor = getNoteColor(key.note);
              
              return (
                <div
                  key={`${key.note}-${index}`}
                  className={`piano-key ${key.type}-key ${isActive ? 'active' : ''} ${isColored ? 'note-colored' : ''}`}
                  style={{
                    '--note-color': backgroundColor,
                    left: `calc(${key.position} * var(--key-width))`,
                  }}
                  onMouseDown={() => handleKeyDown(key.note)}
                  onMouseUp={() => handleKeyUp(key.note)}
                  onMouseLeave={() => handleKeyUp(key.note)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleKeyDown(key.note);
                  }}
                  onTouchEnd={() => handleKeyUp(key.note)}
                >
                  <span className="note-label">{key.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoRetro;