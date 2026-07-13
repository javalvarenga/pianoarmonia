import React, { useState, useCallback, useMemo } from 'react';
import './RetroKeyboard.css';

const RetroKeyboard = ({ 
  noteColors = {}, 
  pressedKeys = new Set(), 
  onKeyPress = () => {}, 
  onKeyRelease = () => {} 
}) => {
  // Definir las notas del teclado (2 octavas completas)
  const notes = useMemo(() => [
    { note: 'C4', type: 'white', position: 0 },
    { note: 'C#4', type: 'black', position: 0.5 },
    { note: 'D4', type: 'white', position: 1 },
    { note: 'D#4', type: 'black', position: 1.5 },
    { note: 'E4', type: 'white', position: 2 },
    { note: 'F4', type: 'white', position: 3 },
    { note: 'F#4', type: 'black', position: 3.5 },
    { note: 'G4', type: 'white', position: 4 },
    { note: 'G#4', type: 'black', position: 4.5 },
    { note: 'A4', type: 'white', position: 5 },
    { note: 'A#4', type: 'black', position: 5.5 },
    { note: 'B4', type: 'white', position: 6 },
    { note: 'C5', type: 'white', position: 7 },
    { note: 'C#5', type: 'black', position: 7.5 },
    { note: 'D5', type: 'white', position: 8 },
    { note: 'D#5', type: 'black', position: 8.5 },
    { note: 'E5', type: 'white', position: 9 },
    { note: 'F5', type: 'white', position: 10 },
    { note: 'F#5', type: 'black', position: 10.5 },
    { note: 'G5', type: 'white', position: 11 },
    { note: 'G#5', type: 'black', position: 11.5 },
    { note: 'A5', type: 'white', position: 12 },
    { note: 'A#5', type: 'black', position: 12.5 },
    { note: 'B5', type: 'white', position: 13 },
    { note: 'C6', type: 'white', position: 14 },
  ], []);

  // Calcular posiciones de las teclas negras
  const getBlackKeyPosition = useCallback((index) => {
    const positions = [0.5, 1.5, 3.5, 4.5, 5.5, 7.5, 8.5, 10.5, 11.5, 12.5];
    return positions[index] || 0;
  }, []);

  // Manejar eventos de teclado
  const handleKeyDown = useCallback((note) => {
    onKeyPress(note);
  }, [onKeyPress]);

  const handleKeyUp = useCallback((note) => {
    onKeyRelease(note);
  }, [onKeyRelease]);

  return (
    <div className="retro-keyboard-container">
      <div className="retro-keyboard">
        {notes.map((key, index) => {
          const isActive = pressedKeys.has(key.note);
          const isColored = noteColors[key.note];
          const backgroundColor = noteColors[key.note] || '';
          
          // Para teclas negras, calcular posición especial
          const position = key.type === 'black' 
            ? getBlackKeyPosition(index - 1) // Ajustar índice para teclas negras
            : key.position;
          
          return (
            <div
              key={`${key.note}-${index}`}
              className={`key ${key.type}-key ${isActive ? 'active' : ''} ${isColored ? 'colored' : ''}`}
              style={{
                '--note-color': backgroundColor,
                left: `calc(${position} * var(--white-key-width))`,
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