import React, { useRef, useState } from 'react';
import * as Tone from 'tone';
import { logError } from '../utils/logger';
import './NoteButton.css';

/**
 * Botón flotante en una esquina que, al pulsarse,
 * reproduce una nota completa de piano (C4) mediante Tone.js.
 *
 * El sampler se crea una sola vez (useRef) tras iniciar el contexto de
 * audio con Tone.start(). No se dispara la nota hasta que sampler.loaded
 * sea true, evitando el error "buffer is either not set or not loaded".
 */
const NoteButton = () => {
  const samplerRef = useRef(null);
  const [ready, setReady] = useState(false);

  /**
   * Crea (una sola vez) el Sampler con muestras Salamander y marca
   * `ready` a true cuando las muestras han terminado de cargar.
   */
  const ensureSampler = async () => {
    if (samplerRef.current) return samplerRef.current;

    // Es imprescindible llamar a Tone.start() dentro del gestor del
    // evento de usuario (click) para que el AudioContext resuma. Lo
    // hacemos antes de crear el sampler para que éste se conecte al
    // contexto ya activo.
    await Tone.start();

    const sampler = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      onload: () => setReady(true),
    }).toDestination();

    samplerRef.current = sampler;
    return sampler;
  };

  const playNote = async () => {
    try {
      const sampler = await ensureSampler();

      // Esperar a que las muestras estén cargadas antes de disparar la
      // nota; de lo contrario Tone lanza "buffer is either not set or
      // not loaded".
      if (!sampler.loaded) {
        await new Promise((resolve) => {
          const check = () => {
            if (sampler.loaded) {
              resolve();
            } else {
              setTimeout(check, 50);
            }
          };
          check();
        });
      }

      setReady(true);
      sampler.triggerAttackRelease('C4', '2n');
    } catch (err) {
      logError('[NoteButton] Fallo al reproducir nota C4', {
        error: err?.message ?? String(err),
        ready,
      });
      setReady(false);
    }
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