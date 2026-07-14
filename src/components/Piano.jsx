import React from 'react';
import { Chord } from '@tonaljs/tonal';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';

const Piano = ({ scale, chord, notas = [] }) => {
  // Obtener las notas del acorde usando Tonal
  const chordNotes = chord ? Chord.get(chord).notes : [];
  
  // Extraer la nota raíz del acorde (ejemplo: de "Cmaj" obtener "C")
  const rootNote = chord ? chord.match(/^([A-G][#b]?)/)?.[1] : null;
  
  // Definir el orden de notas
  const noteOrder = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  
  // Mapear cada nota del arreglo chordNotes a una nota con octava
  const chordNotesWithOctave = rootNote ? chordNotes.map((note, index) => {
    const rootIndex = noteOrder.indexOf(rootNote);
    const noteIndex = noteOrder.indexOf(note);
    
    // Si el índice de la nota es mayor o igual al índice de la raíz, usar octava 4
    // De lo contrario, usar octava 5
    const octave = noteIndex >= rootIndex ? 4 : 5;
    return `${note}${octave}`;
  }) : [];
  
  // Combinar notas del acorde con notas proporcionadas
  const allNotesToHighlight = [...new Set([...chordNotesWithOctave, ...notas])];
  
  // Determinar si una nota pertenece al acorde actual
  const isChordNote = (noteWithOctave) => {
    // Extraer solo el nombre de la nota sin la octava
    const noteName = noteWithOctave.replace(/\d+$/, '');
    return chordNotes.includes(noteName);
  };

  // Determinar color para las notas del acorde
  const getNoteColor = (noteWithOctave) => {
    // Verificar si la nota con octava está en la lista de notas a resaltar
    if (notas.includes(noteWithOctave)) {
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
          notas={allNotesToHighlight}
        />
      </div>
    </div>
  );
};

export default Piano;