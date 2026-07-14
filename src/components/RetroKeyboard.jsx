import React, { useState } from 'react';
import './RetroKeyboard.css';

const RetroKeyboard = ({ getNoteColor, isChordNote }) => {
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
    { note: 'C', type: 'white', position: 14 }
  ];

  const [pressedKeys, setPressedKeys] = useState(new Set());

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
      <div className="piano-keys">
        {notes.map((key, index) => {
          const isPressed = pressedKeys.has(key.note);
          const color = getNoteColor ? getNoteColor(key.note) : '';
          const isChord = isChordNote ? isChordNote(key.note) : false;
          
          return (
            <div
              key={`${key.note}-${index}`}
              className={`key ${key.type} ${isPressed ? 'active' : ''} ${isChord ? 'chord-note' : ''}`}
              style={{
                '--position': key.position,
                '--note-color': color
              }}
              onClick={() => handleKeyDown(key.note)}
              onMouseLeave={() => handleKeyUp(key.note)}
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