import React, { useState, useCallback, useMemo } from 'react';
import './RetroKeyboard.css';

const RetroKeyboard = ({ activeNotes = [] }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // Definir las notas del teclado (2 octavas completas)
  const notes = useMemo(() => [
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
    { note: 'C', position: 7, type: 'white' },
    { note: 'C#', position: 7.5, type: 'black' },
    { note: 'D', position: 8, type: 'white' },
    { note: 'D#', position: 8.5, type: 'black' },
    { note: 'E', position: 9, type: 'white' },
    { note: 'F', position: 10, type: 'white' },
    { note: 'F#', position: 10.5, type: 'black' },
    { note: 'G', position: 11, type: 'white' },
    { note: 'G#', position: 11.5, type: 'black' },
    { note: 'A', position: 12, type: 'white' },
    { note: 'A#', position: 12.5, type: 'black' },
    { note: 'B', position: 13, type: 'white' },
    { note: 'C', position: 14, type: 'white' }
  ], []);

  // Mapeo de colores para las notas
  const getNoteColor = useCallback((note) => {
    if (!activeNotes.includes(note)) return '';
    
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
    <div className="retro-keyboard-container">
      <div className="retro-keyboard">
        {notes.map((key, index) => {
          const isActive = pressedKeys.has(key.note);
          const isColored = activeNotes.includes(key.note);
          const backgroundColor = getNoteColor(key.note);
          
          return (
            <div
              key={`${key.note}-${index}`}
              className={`key ${key.type}-key ${isActive ? 'active' : ''} ${isColored ? 'colored' : ''}`}
              style={{
                '--note-color': backgroundColor,
                left: `calc(${key.position} * var(--white-key-width))`,
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
              <span className="key-label">{key.note}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RetroKeyboard;