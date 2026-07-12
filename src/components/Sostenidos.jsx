import React from 'react';

const Sostenidos = ({ 
  noteColors = {}, 
  onKeyPress = () => {}, 
  getNoteColor = () => 'transparent', 
  hasNoteColor = () => false,
  startOctave = 3,
  endOctave = 4
}) => {
  // Definir las posiciones de las teclas negras
  const blackKeyPositions = {
    'C#': 1,
    'D#': 2,
    'F#': 4,
    'G#': 5,
    'A#': 6
  };

  // Generar todas las notas negras para el rango de octavas
  const generateBlackNotes = () => {
    const blackNotes = [];
    const blackNoteNames = ['C#', 'D#', 'F#', 'G#', 'A#'];
    
    for (let octave = startOctave; octave <= endOctave; octave++) {
      blackNoteNames.forEach(note => {
        blackNotes.push(`${note}${octave}`);
      });
    }
    
    return blackNotes;
  };

  const blackNotes = generateBlackNotes();

  // Calcular posición de tecla negra
  const getBlackKeyPosition = (note) => {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));
    
    // Calcular desplazamiento basado en la octava
    const octaveOffset = (octave - startOctave) * 7;
    
    return octaveOffset + blackKeyPositions[noteName];
  };

  return (
    <div className="black-keys">
      {blackNotes.map((note) => {
        const position = getBlackKeyPosition(note);
        
        return (
          <div 
            key={note}
            className={`black-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
            style={{
              left: `calc(${(position - 0.5) * (100 / 14)}% - 2%)`,
              backgroundColor: hasNoteColor(note) ? getNoteColor(note) : 'black',
              borderColor: hasNoteColor(note) ? getNoteColor(note) : '#333'
            }}
            onClick={() => onKeyPress(note)}
          >
            <span className="key-label">{note}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sostenidos;