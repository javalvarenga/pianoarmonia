import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Piano as RPiano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import Soundfont from 'soundfont-player';
import './RealisticKeyboard.css';

/**
 * SoundfontProvider: carga un instrumento soundfont y expone
 * playNote / stopNote mediante render props.
 */
const SoundfontProvider = ({
  instrumentName = 'acoustic_grand_piano',
  render,
}) => {
  const [instrument, setInstrument] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AC();
    }
    const ac = audioContextRef.current;

    Soundfont.instrument(ac, instrumentName)
      .then((inst) => {
        if (!cancelled) setInstrument(inst);
      })
      .catch((err) => {
        console.error('Error loading soundfont:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [instrumentName]);

  const playNote = useCallback(
    (midiNumber) => {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (instrument) instrument.play(midiNumber);
    },
    [instrument],
  );

  const stopNote = useCallback(
    (midiNumber) => {
      if (instrument) instrument.stop(midiNumber);
    },
    [instrument],
  );

  const stopAllNotes = useCallback(() => {
    if (instrument) instrument.stop();
  }, [instrument]);

  return render({
    isLoading: !instrument,
    playNote,
    stopNote,
    stopAllNotes,
  });
};

/**
 * Hook para medir el ancho de un elemento contenedor de forma reactiva.
 * Devuelve el ancho en píxeles (0 hasta que se mide).
 */
function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const measure = () => {
      setWidth(el.clientWidth);
    };

    measure();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
  }, []);

  return [ref, width];
}

/**
 * RealisticKeyboard
 *
 * Piano realista construido con react-piano + soundfont-player.
 *
 * Props:
 *  - highlightedNotes: array de strings con nombres de nota (ej. "C4", "E4")
 *    que se resaltan permanentemente con fondo ámbar (var(--glow-accent)).
 */
const RealisticKeyboard = ({ highlightedNotes = [] }) => {
  const firstNote = MidiNumbers.fromNote('C4');
  const lastNote = MidiNumbers.fromNote('B5');

  // Medir el ancho real del contenedor para pasarlo a react-piano
  const [containerRef, containerWidth] = useContainerWidth();

  // Convertir highlightedNotes (strings) a números MIDI
  const highlightedMidis = (highlightedNotes || [])
    .map((n) => {
      try {
        return MidiNumbers.fromNote(n);
      } catch {
        return null;
      }
    })
    .filter((m) => m !== null);

  const highlightedSet = new Set(highlightedMidis);

  // Notas actualmente siendo tocadas por el usuario (click)
  const [playedNotes, setPlayedNotes] = useState(new Set());

  const onPlayNoteInput = useCallback((midiNumber) => {
    setPlayedNotes((prev) => {
      const next = new Set(prev);
      next.add(midiNumber);
      return next;
    });
  }, []);

  const onStopNoteInput = useCallback((midiNumber) => {
    setPlayedNotes((prev) => {
      const next = new Set(prev);
      next.delete(midiNumber);
      return next;
    });
  }, []);

  // Combinar notas resaltadas + notas tocadas → activeNotes para react-piano
  const activeNotes = [
    ...new Set([...highlightedMidis, ...Array.from(playedNotes)]),
  ];

  // react-piano requiere width en píxeles. Si el contenedor aún no se ha
  // medido, usar un mínimo para que las teclas no colapsen a 0.
  const pianoWidth = containerWidth > 0 ? containerWidth : 900;

  return (
    <div className="realistic-keyboard-container" ref={containerRef}>
      <SoundfontProvider
        instrumentName="acoustic_grand_piano"
        render={({ isLoading, playNote, stopNote, stopAllNotes }) => (
          <div className="realistic-piano-wrapper">
            {isLoading && (
              <p className="realistic-keyboard-loading">
                Cargando sonido de piano…
              </p>
            )}
            <RPiano
              noteRange={{ first: firstNote, last: lastNote }}
              activeNotes={activeNotes}
              onPlayNoteInput={(midiNumber, opts) => {
                playNote(midiNumber);
                onPlayNoteInput(midiNumber, opts);
              }}
              onStopNoteInput={(midiNumber, opts) => {
                stopNote(midiNumber);
                onStopNoteInput(midiNumber, opts);
              }}
              keyWidthToHeight={0.33}
              width={pianoWidth}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RealisticKeyboard;
