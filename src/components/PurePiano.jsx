import React, { useState, useEffect } from 'react';
import './purePiano.css';
import { Sostenidos } from './Sostenidos'; // Importación añadida

/**
 * Componente PurePiano que renderiza un teclado de piano básico.
 * Recibe únicamente noteColors para determinar qué teclas resaltar y con qué color.
 */
const PurePiano = ({ noteColors = {}, onKeyPress = () => {} }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al cargar
    checkIsMobile();

    // Agregar event listener
    window.addEventListener('resize', checkIsMobile);

    // Limpiar event listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

  // Determinar el rango de octavas según el dispositivo
  const startOctave = isMobile ? 4 : 4;
  const endOctave = isMobile ? 5 : 6;

  // Generamos el teclado para el rango de octavas
  const keyboard = [];
  for (let octave = startOctave; octave <= endOctave; octave++) {
    notesTemplate.forEach((n) => {
      const fullNote = `${n.note}${octave}`;
      keyboard.push({ ...n, fullNote });
    });
  }

  // Normalizamos las notas a resaltar
  const normalizedNoteColors = {};
  if (noteColors && typeof noteColors === 'object') {
    for (const [note, color] of Object.entries(noteColors)) {
      const normalized = getNormalizedNote(note);
      normalizedNoteColors[normalized] = color;
    }
  }

  return (
    <div className="piano-keyboard">
      {keyboard.map((key, index) => {
        // Buscamos el color para la nota actual
        const colorClass = normalizedNoteColors[key.fullNote] || '';

        return (
          <div
            key={`${key.fullNote}-${index}`}
            className={`piano-key ${key.type} ${colorClass}`}
            onClick={() => onKeyPress(key.fullNote)}
          />
        );
      })}
    </div>
  );
};

export default PurePiano;
