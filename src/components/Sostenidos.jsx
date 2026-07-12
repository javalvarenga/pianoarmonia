import React from 'react';

/**
 * Componente Sostenidos que renderiza las teclas negras del piano.
 * Recibe noteColors, onKeyPress, getNoteColor y hasNoteColor como props.
 */
const Sostenidos = ({ noteColors = {}, onKeyPress = () => {}, getNoteColor = () => {}, hasNoteColor = () => {} }) => {
  // Notas con sostenido
  const sharpNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];

  return (
    <div className="black-keys">
      {sharpNotes.map((note, index) => {
        // Calcular la posición de las teclas negras
        const positions = ['10%', '25%', '55%', '70%', '85%'];
        
        return (
          <div 
            key={note}
            className={`black-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
            style={{
              left: positions[index],
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