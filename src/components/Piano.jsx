import React from 'react';
import { Chord } from '@tonaljs/tonal';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';

const Piano = ({ scale, chord }) => {
  // Obtener las notas del acorde usando Tonal
  const chordNotes = chord ? Chord.get(chord).notes : [];
  
  // Determinar si una nota pertenece al acorde actual
  const isChordNote = (note) => {
    return chordNotes.includes(note);
  };

  // Determinar color para las notas del acorde
  const getNoteColor = (note) => {
    // Solo aplicar color si es una nota del acorde
    if (isChordNote(note)) {
      // Usar un solo color para todas las notas del acorde
      return '#45b7d1'; // Azul turquesa
    }
    return '';
  };

  return (
    <div className="piano-container">
      <h3 className="piano-title">Piano Interactivo</h3>
      <div className="piano-keyboard-section">
        <RetroKeyboard 
          getNoteColor={getNoteColor}
          isChordNote={isChordNote}
        />
      </div>
    </div>
  );
};

export default Piano;