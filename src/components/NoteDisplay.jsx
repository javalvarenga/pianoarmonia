import React from 'react';
import { Scale, Chord } from 'tonal';

const NoteDisplay = ({ scale, chord }) => {
  // Generar notas de la escala
  const scaleNotes = Scale.get(scale).notes || [];
  
  // Generar notas del acorde
  const chordNotes = Chord.get(chord).notes || [];
  
  // Combinar notas de escala y acorde
  const highlightedNotes = [...new Set([...scaleNotes, ...chordNotes])];
  
  return (
    <div className="note-display">
      <h3>Notas Destacadas</h3>
      <div className="notes-container">
        {highlightedNotes.map((note, index) => (
          <span key={index} className="note-item">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NoteDisplay;