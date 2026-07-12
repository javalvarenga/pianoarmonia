import React, { useState, useCallback } from 'react';
import './Piano.css';

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

  const handleKeyClick = (note) => {
    if (typeof window !== 'undefined' && window.onKeyPress) {
      window.onKeyPress(note);
    }
  };

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
    <div className="retro-piano-container">
      <div className="piano-keys">
        {/* Teclas blancas */}
        {whiteNotes.map((key) => {
          const isActive = pressedKeys.has(key.note);
          const isColored = noteColors[key.note];
          const backgroundColor = isColored ? noteColors[key.note] : '';
          
          return (
            <div
              key={key.note + key.position}
              className={`key white ${isActive ? 'active' : ''} ${isColored ? 'note-colored' : ''}`}
              data-note={key.note}
              style={backgroundColor ? { '--note-color': backgroundColor } : {}}
              onClick={() => handleKeyClick(key.note)}
              onMouseDown={() => handleKeyDown(key.note)}
              onMouseUp={() => handleKeyUp(key.note)}
              onMouseLeave={() => handleKeyUp(key.note)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown(key.note);
              }}
              onTouchEnd={() => handleKeyUp(key.note)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleKeyDown(key.note);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleKeyUp(key.note);
                }
              }}
              aria-label={`Tecla ${key.note}`}
            >
              {key.note}
            </div>
          );
        })}
        
        {/* Teclas negras */}
        {blackNotes.map((key) => {
          const isActive = pressedKeys.has(key.note);
          const isColored = noteColors[key.note];
          const backgroundColor = isColored ? noteColors[key.note] : '';
          
          return (
            <div
              key={key.note + key.position}
              className={`key black ${isActive ? 'active' : ''} ${isColored ? 'note-colored' : ''}`}
              data-note={key.note}
              style={backgroundColor ? { '--note-color': backgroundColor } : {}}
              onClick={() => handleKeyClick(key.note)}
              onMouseDown={() => handleKeyDown(key.note)}
              onMouseUp={() => handleKeyUp(key.note)}
              onMouseLeave={() => handleKeyUp(key.note)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown(key.note);
              }}
              onTouchEnd={() => handleKeyUp(key.note)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleKeyDown(key.note);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleKeyUp(key.note);
                }
              }}
              aria-label={`Tecla ${key.note}`}
            >
              {key.note}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Piano;