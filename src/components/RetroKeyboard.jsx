import React, { useState } from 'react';
import './RetroKeyboard.css';

const RetroKeyboard = ({ getNoteColor, isChordNote, notas = [] }) => {
  // Generar notas del piano (2 octavas completas)
  const generateNotes = () => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notes = [];
    
    // Generar dos octavas (C4 a B5)
    for (let octave = 4; octave <= 5; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        const noteName = noteNames[i];
        const position = (octave - 4) * 12 + i;
        
        // Determinar si es nota negra
        const isBlack = noteName.includes('#');
        
        notes.push({
          note: `${noteName}${octave}`,
          type: isBlack ? 'black' : 'white',
          position: position
        });
      }
    }
    
    return notes;
  };

  const notes = generateNotes();

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