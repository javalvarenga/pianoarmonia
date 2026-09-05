import React, { useRef, useState } from 'react';
import * as Tone from 'tone';
import './NoteButton.css';

/**
 * Botón flotante en una esquina que, al pulsarse,
 * reproduce una nota completa de piano (C4) mediante Tone.js.
 */
const NoteButton = () => {
  const samplerRef = useRef(null);
  const [ready, setReady] = useState(false);

  const playNote = async () => {
    await Tone.start();

    if (!samplerRef.current) {
      samplerRef.current = new Tone.Sampler({
        urls: {
          C4: 'C4.mp3',
        },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        onload: () => setReady(true),
      }).toDestination();
    }

    const sampler = samplerRef.current;
    // Si las muestras aún no cargan, dispara igual; Tone encolará la nota.
    sampler.triggerAttackRelease('C4', '2n');
  };

  return (
    <button
      className="note-button"
      onClick={playNote}
      aria-label="Reproducir nota de piano C4"
      title="Reproducir nota de piano C4"
    >
      ♪
    </button>
  );
};

export default NoteButton;