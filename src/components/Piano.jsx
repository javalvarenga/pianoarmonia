import React, { useMemo } from 'react';
import { Chord } from '@tonaljs/tonal';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Asigna octava a cada nota del acorde: empieza en la 1ª octava del teclado (4);
 * si una nota queda "antes" de la raíz en el cromático, sube a la octava 5.
 */
function notesWithOctaves(chordNotes, rootNote, baseOctave = 4) {
  if (!rootNote || chordNotes.length === 0) return [];
  const rootIndex = NOTE_ORDER.indexOf(rootNote);
  if (rootIndex < 0) return [];

  return chordNotes.map((note) => {
    const noteIndex = NOTE_ORDER.indexOf(note);
    const octave = noteIndex >= rootIndex ? baseOctave : baseOctave + 1;
    return `${note}${octave}`;
  });
}

const Piano = ({ scale, chord, notas = [] }) => {
  const chordNotes = useMemo(
    () => (chord ? Chord.get(chord).notes ?? [] : []),
    [chord],
  );

  const rootNote = useMemo(() => {
    if (!chord) return null;
    return chord.match(/^([A-G][#b]?)/)?.[1] ?? null;
  }, [chord]);

  const highlighted = useMemo(() => {
    const fromChord = notesWithOctaves(chordNotes, rootNote, 4);
    return [...new Set([...fromChord, ...notas])];
  }, [chordNotes, rootNote, notas]);

  // Pasar las notas del acorde a RetroKeyboard para que las resalte
  const chordsForKeyboard = useMemo(
    () => (highlighted.length > 0 ? [{ name: '', notes: highlighted }] : []),
    [highlighted],
  );

  return (
    <div className="piano-container">
      {scale ? (
        <p className="piano-scale-label">Escala: {scale}</p>
      ) : null}
      <div className="piano-keyboard-section">
        <RetroKeyboard chords={chordsForKeyboard} />
      </div>
    </div>
  );
};

export default Piano;
