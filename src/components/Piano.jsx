import React, { useState, useCallback } from 'react';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';

const Piano = ({ noteColors = {} }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // Notas del piano (2 octavas completas)
  const whiteNotes = [
    { note: 'C', position: 0 },
    { note: 'D', position: 1 },
    { note: 'E', position: 2 },
    { note: 'F', position: 3 },
    { note: 'G', position: 4 },
    { note: 'A', position: 5 },
    { note: 'B', position: 6 },
    { note: 'C', position: 7 },
    { note: 'D', position: 8 },
    { note: 'E', position: 9 },
    { note: 'F', position: 10 },
    { note: 'G', position: 11 },
    { note: 'A', position: 12 },
    { note: 'B', position: 13 },
    { note: 'C', position: 14 },
  ];

  const blackNotes = [
    { note: 'C#', position: 0.5 },
    { note: 'D#', position: 1.5 },
    { note: 'F#', position: 3.5 },
    { note: 'G#', position: 4.5 },
    { note: 'A#', position: 5.5 },
    { note: 'C#', position: 7.5 },
    { note: 'D#', position: 8.5 },
    { note: 'F#', position: 10.5 },
    { note: 'G#', position: 11.5 },
    { note: 'A#', position: 12.5 },
  ];

  // Determinar color para una nota
  const getNoteColor = useCallback((note) => {
    return noteColors[note] || '';
  }, [noteColors]);

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
    <div className="piano-container">
      <h3 className="piano-title">Piano Interactivo</h3>
      <div className="piano-keyboard-section">
        <h4>Teclado de Piano</h4>
        <div className="piano-keys">
          {/* Teclas blancas */}
          {whiteNotes.map((key) => {
            const isActive = pressedKeys.has(key.note);
            const backgroundColor = getNoteColor(key.note);
            
            return (
              <div
                key={`white-${key.note}-${key.position}`}
                className={`piano-key white-key ${isActive ? 'active' : ''}`}
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
          
          {/* Teclas negras */}
          {blackNotes.map((key) => {
            const isActive = pressedKeys.has(key.note);
            const backgroundColor = getNoteColor(key.note);
            
            return (
              <div
                key={`black-${key.note}-${key.position}`}
                className={`piano-key black-key ${isActive ? 'active' : ''}`}
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
      
      {/* Sección del teclado retro */}
      <div className="piano-keyboard-section">
        <h4>Teclado Retro</h4>
        <RetroKeyboard activeNotes={Object.keys(noteColors)} />
      </div>
    </div>
  );
};

export default Piano;