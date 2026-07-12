import React, { useState, useEffect } from 'react';
import './purePiano.css';
import Sostenidos from './Sostenidos.jsx';

const PurePiano = ({ noteColors = {}, onKeyPress = () => {} }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const START_OCTAVE = 3;
  const END_OCTAVE = 4;

  // Generar notas blancas para el rango de octavas especificado
  const generateWhiteNotes = () => {
    const whiteNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const notes = [];
    
    for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
      whiteNoteNames.forEach(note => {
        notes.push(`${note}${octave}`);
      });
    }
    
    return notes;
  };

  const whiteNotes = generateWhiteNotes();
  
  const getNoteColor = (note) => {
    return noteColors[note] || 'transparent';
  };

  const hasNoteColor = (note) => {
    return noteColors[note] && noteColors[note] !== 'transparent';
  };

  return (
    <div className="piano-container">
      <div className="piano">
        <div className="white-keys">
          {whiteNotes.map((note) => (
            <div 
              key={note}
              className={`white-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
              style={{
                backgroundColor: hasNoteColor(note) ? getNoteColor(note) : 'white',
                borderColor: hasNoteColor(note) ? getNoteColor(note) : '#ccc'
              }}
              onClick={() => onKeyPress(note)}
            >
              <span className="key-label">{note}</span>
            </div>
          ))}
        </div>
        
        <Sostenidos 
          noteColors={noteColors}
          onKeyPress={onKeyPress}
          getNoteColor={getNoteColor}
          hasNoteColor={hasNoteColor}
          startOctave={START_OCTAVE}
          endOctave={END_OCTAVE}
        />
      </div>
      
      {Object.keys(noteColors).length > 0 && (
        <div className="active-notes-indicator">
          <h4>Notas resaltadas:</h4>
          <div className="notes-container">
            {Object.entries(noteColors).map(([note, color]) => (
              <div key={note} className="note-item">
                <div 
                  className="note-color-box" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="note-name">{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurePiano;