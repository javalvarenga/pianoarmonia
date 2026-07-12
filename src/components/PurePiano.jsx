import React from 'react';
import './purePiano.css';

const PurePiano = ({ noteColors = {}, onKeyPress = () => {} }) => {
  // Definir las notas del piano (2 octavas completas)
  const START_OCTAVE = 3;
  const END_OCTAVE = 4;
  
  // Notas blancas
  const whiteNotes = [];
  for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'].forEach(note => {
      whiteNotes.push(`${note}${octave}`);
    });
  }
  
  // Notas negras
  const blackNotes = [];
  for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
    ['C#', 'D#', 'F#', 'G#', 'A#'].forEach(note => {
      blackNotes.push(`${note}${octave}`);
    });
  }
  
  // Posiciones de las teclas negras (en porcentaje)
  const blackKeyPositions = {
    'C#3': 7.14,
    'D#3': 21.43,
    'F#3': 50,
    'G#3': 64.29,
    'A#3': 78.57,
    'C#4': 7.14 + 100,
    'D#4': 21.43 + 100,
    'F#4': 50 + 100,
    'G#4': 64.29 + 100,
    'A#4': 78.57 + 100
  };
  
  const getNoteColor = (note) => {
    return noteColors[note] || 'transparent';
  };

  const hasNoteColor = (note) => {
    return noteColors[note] && noteColors[note] !== 'transparent';
  };

  return (
    <>
      <div className="piano" role="region" aria-label="Piano interactivo">
        {/* Teclas blancas */}
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
              aria-label={`Tecla ${note}`}
              role="button"
              tabIndex="0"
              aria-pressed={hasNoteColor(note) ? 'true' : 'false'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onKeyPress(note);
                }
              }}
            >
              <span className="key-label">{note}</span>
            </div>
          ))}
        </div>
        
        {/* Teclas negras */}
        <div className="black-keys">
          {blackNotes.map((note) => (
            <div 
              key={note}
              className={`black-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
              style={{
                left: `${blackKeyPositions[note]}%`,
                backgroundColor: hasNoteColor(note) ? getNoteColor(note) : 'black',
                borderColor: hasNoteColor(note) ? getNoteColor(note) : '#333'
              }}
              onClick={() => onKeyPress(note)}
              aria-label={`Tecla ${note}`}
              role="button"
              tabIndex="0"
              aria-pressed={hasNoteColor(note) ? 'true' : 'false'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onKeyPress(note);
                }
              }}
            >
              <span className="key-label">{note}</span>
            </div>
          ))}
        </div>
      </div>
      
      {Object.keys(noteColors).length > 0 && (
        <div className="active-notes-indicator" aria-live="polite">
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
    </>
  );
};

export default PurePiano;