import React from 'react';
import './purePiano.css';

/**
 * Componente PurePiano que renderiza un teclado de piano básico.
 * Recibe únicamente noteColors para determinar qué teclas resaltar y con qué color.
 */
const PurePiano = ({ noteColors = {}, onKeyPress = () => {} }) => {
  // Definición estándar de la escala cromática
  const notesTemplate = [
    { note: 'C', type: 'white' },
    { note: 'C#', type: 'black' },
    { note: 'D', type: 'white' },
    { note: 'D#', type: 'black' },
    { note: 'E', type: 'white' },
    { note: 'F', type: 'white' },
    { note: 'F#', type: 'black' },
    { note: 'G', type: 'white' },
    { note: 'G#', type: 'black' },
    { note: 'A', type: 'white' },
    { note: 'A#', type: 'black' },
    { note: 'B', type: 'white' },
  ];

  // Mapeo de equivalencias para bemoles (Flat) -> Sostenidos (Sharp)
  const flatToSharp = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };

  const getNormalizedNote = (noteStr) => {
    if (!noteStr) return '';
    // Separar la nota de la octava (ej: 'Db4' -> ['Db', '4'])
    const match = noteStr.match(/^([A-G][#b]?)([0-9]*)$/);
    if (!match) return noteStr;
    
    const [_, name, octave] = match;
    const normalizedName = flatToSharp[name] || name;
    return `${normalizedName}${octave}`;
  };

  // Generamos el teclado para 3 octavas empezando desde C4 (4, 5 y 6)
  const keyboard = [];
  for (let octave = 4; octave <= 6; octave++) {
    notesTemplate.forEach((n) => {
      const fullNote = `${n.note}${octave}`;
      keyboard.push({ ...n, fullNote });
    });
  }

  return (
    <div className="piano-keyboard-wrapper">
      <div className="piano-keyboard">
        {keyboard.map((key, index) => {
          // Buscamos el color para la nota actual
          let colorClass = '';
          if (noteColors && typeof noteColors === 'object') {
            for (const [note, color] of Object.entries(noteColors)) {
              if (getNormalizedNote(note) === key.fullNote) {
                colorClass = color;
                break;
              }
            }
          }

          return (
            <div
              key={index}
              className={`piano-key ${key.type} ${colorClass}`}
              onClick={() => onKeyPress(key.fullNote)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PurePiano;