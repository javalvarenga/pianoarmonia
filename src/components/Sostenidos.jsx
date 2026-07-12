import React from 'react';

/**
 * Componente Sostenidos que renderiza las teclas negras del piano.
 * Recibe noteColors, onKeyPress, getNoteColor y hasNoteColor como props.
 */
const Sostenidos = ({ 
  noteColors = {}, 
  onKeyPress = () => {}, 
  getNoteColor = () => {}, 
  hasNoteColor = () => {},
  startOctave = 3,
  endOctave = 4
}) => {
  // Generar notas sostenidas para el rango de octavas especificado
  const generateSharpNotes = () => {
    const sharpNoteNames = ['C#', 'D#', 'F#', 'G#', 'A#'];
    const notes = [];
    
    for (let octave = startOctave; octave <= endOctave; octave++) {
      sharpNoteNames.forEach(note => {
        notes.push(`${note}${octave}`);
      });
    }
    
    return notes;
  };

  const sharpNotes = generateSharpNotes();

  // Calcular posiciones para las teclas negras
  const calculatePosition = (index) => {
    // Cada octava tiene 7 teclas blancas
    const octavePosition = Math.floor(index / 5);
    const inOctaveIndex = index % 5;
    
    // Posiciones relativas de las teclas negras en una octava
    const positionsInOctave = [0, 1, 3, 4, 5];
    
    // Calcular la posición en porcentaje
    const position = (octavePosition * 7 + positionsInOctave[inOctaveIndex]) * (100 / 14);
    
    return `${position}%`;
  };

  return (
    <div className="black-keys">
      {sharpNotes.map((note, index) => {
        return (
          <div 
            key={note}
            className={`black-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
            style={{
              left: calculatePosition(index),
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