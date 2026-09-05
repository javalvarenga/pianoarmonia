import React, { useRef } from 'react';
import * as Tone from 'tone';
import { normalizeNote } from '../utils/scaleGenerator';
import { logError } from '../utils/logger';
import './Acorde.css';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Asigna octava a cada nota del acorde: empieza en la 4ª octava;
 * si una nota queda "antes" de la raíz en el cromático, sube a la octava 5.
 */
function notesWithOctaves(chordNotes, rootNote, baseOctave = 4) {
  if (!rootNote || chordNotes.length === 0) return [];
  const normalizedRoot = normalizeNote(rootNote);
  const rootIndex = NOTE_ORDER.indexOf(normalizedRoot);
  if (rootIndex < 0) return [];

  return chordNotes.map((note) => {
    const normalized = normalizeNote(note);
    const noteIndex = NOTE_ORDER.indexOf(normalized);
    const octave = noteIndex >= rootIndex ? baseOctave : baseOctave + 1;
    return `${normalized}${octave}`;
  });
}

const Acorde = ({ chordDetails, chordColor }) => {
  const synthRef = useRef(null);

  const playChord = async () => {
    // Crear el sintetizador ANTES de Tone.start() para que el contexto de
    // audio real exista cuando start() llame a resume(). Si se hace al reves,
    // start() opera sobre el DummyContext (no-op) y el contexto real queda
    // suspendido, por lo que no se emite sonido en el primer click.
    try {
      if (!synthRef.current) {
        synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
      }

      await Tone.start();

      const synth = synthRef.current;
      const rawNotes = chordDetails.notes || [];
      if (rawNotes.length === 0) {
        logError('[Acorde] Sin notas para reproducir', { chord: chordDetails });
        return;
      }

      // Tone.js requiere notas con octava; Chord.get devuelve notas sin octava
      const rootNote = (chordDetails.tonic ||
        (chordDetails.symbol || '').match(/^([A-G][#b]?)/)?.[1] ||
        rawNotes[0]
      );
      const notes = notesWithOctaves(rawNotes, rootNote, 4);

      if (notes.length > 0) {
        synth.triggerAttackRelease(notes, '2n');
      } else {
        logError('[Acorde] No se pudieron calcular notas con octava', {
          rawNotes,
          rootNote,
          chord: chordDetails,
        });
      }
    } catch (err) {
      logError('[Acorde] Fallo al reproducir el acorde', {
        chord: chordDetails,
        error: err?.message ?? String(err),
      });
    }
  };

  return (
    <div className="acorde-component">
      <div className="acorde-info">
        <h4 className="chord-name" style={{ color: chordColor }}>
          {chordDetails.name || chordDetails.symbol}
        </h4>
        <div className="notes-info">
          <span className="notes-label">Notas:</span>
          <span className="notes-list">{chordDetails.notes.join(', ')}</span>
        </div>
      </div>
      <button
        className="chord-play-button"
        onClick={playChord}
        aria-label={`Reproducir acorde ${chordDetails.name || chordDetails.symbol}`}
        title={`Reproducir acorde ${chordDetails.name || chordDetails.symbol}`}
      >
        ▶
      </button>
    </div>
  );
};

export default Acorde;