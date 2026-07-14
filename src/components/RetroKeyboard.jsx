import { useEffect, useRef, useState } from 'react';
import './RetroKeyboard.css';

// Mapeo de nombres de nota a índice de tecla blanca y si tiene negra adyacente
const NOTE_LAYOUT = [
  { note: 'C', whiteIndex: 0, hasBlack: true, blackNote: 'C#' },
  { note: 'D', whiteIndex: 1, hasBlack: true, blackNote: 'D#' },
  { note: 'E', whiteIndex: 2, hasBlack: false },
  { note: 'F', whiteIndex: 3, hasBlack: true, blackNote: 'F#' },
  { note: 'G', whiteIndex: 4, hasBlack: true, blackNote: 'G#' },
  { note: 'A', whiteIndex: 5, hasBlack: true, blackNote: 'A#' },
  { note: 'B', whiteIndex: 6, hasBlack: false },
];

const WHITE_COUNT = 14; // 2 octavas

// Colores para resaltar acordes
const CHORD_COLORS = [
  '#5b9bd5',
  '#e07b5b',
  '#5bbd72',
  '#b85bd5',
  '#d5c25b',
  '#5bd5c0',
  '#d55b8a',
  '#8b9b5b',
];

/**
 * Genera las teclas (blancas y negras) para una octava inicial + segunda octava.
 * Cada nota puede marcarse como chord-note con un color.
 *
 * Las chordNotes llegan con octava (p.ej. "C4", "E4", "G4"). Solo se marca
 * la tecla cuyo nombre completo coincide, evitando duplicar el resaltado
 * en ambas octavas.
 */
function buildKeys(chordNotes, color) {
  const keys = [];
  // Conjunto de nombres completos (con octava) para marcar una sola vez
  const noteSet = new Set(chordNotes);
  // Mapa de nombre sin octava → nombre con octava, para extraer el label
  const noteLabelMap = new Map();
  chordNotes.forEach((n) => {
    const bare = n.replace(/[0-9]/g, '');
    noteLabelMap.set(bare, n);
  });

  for (let octave = 0; octave < 2; octave++) {
    NOTE_LAYOUT.forEach((entry) => {
      const globalWhiteIndex = octave * 7 + entry.whiteIndex;
      const noteName = entry.note + (octave + 4); // octava 4 y 5
      const isChordNote = noteSet.has(noteName);

      keys.push({
        type: 'white',
        note: noteName,
        whiteIndex: globalWhiteIndex,
        isChordNote,
        color,
        label: isChordNote ? entry.note : '',
      });

      if (entry.hasBlack) {
        const blackNoteName = entry.blackNote + (octave + 4);
        const isBlackChord = noteSet.has(blackNoteName);
        keys.push({
          type: 'black',
          note: blackNoteName,
          whiteIndex: globalWhiteIndex,
          isChordNote: isBlackChord,
          color,
          label: isBlackChord ? entry.blackNote : '',
        });
      }
    });
  }

  return keys;
}

function PianoRow({ chordName, chordNotes, color, onNotePress, activeNotes }) {
  const keys = buildKeys(chordNotes, color);

  return (
    <div className="piano-row">
      {chordName && <div className="piano-row-label">{chordName}</div>}
      <div
        className="piano-keys"
        style={{ '--white-count': WHITE_COUNT }}
      >
        {keys.map((key) => {
          const isActive = activeNotes && activeNotes.has(key.note);
          const className = [
            'key',
            key.type === 'white' ? 'white-key' : 'black-key',
            key.isChordNote ? 'chord-note' : '',
            isActive ? 'active' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={key.note}
              className={className}
              style={{
                '--white-index': key.whiteIndex,
                '--note-color': key.color,
              }}
              onMouseDown={() => onNotePress && onNotePress(key.note)}
              onTouchStart={(e) => {
                e.preventDefault();
                onNotePress && onNotePress(key.note);
              }}
            >
              {key.label && <span className="key-label">{key.label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * RetroKeyboard soporta dos modos:
 * 1. chords: array de { name, notes } → renderiza una fila por acorde
 * 2. chords vacío / sin chords → renderiza un solo teclado
 */
export default function RetroKeyboard({
  chords = [],
  onNotePress,
  activeNotes,
}) {
  const containerRef = useRef(null);
  const [activeSet, setActiveSet] = useState(activeNotes || new Set());

  useEffect(() => {
    if (activeNotes) setActiveSet(activeNotes);
  }, [activeNotes]);

  // Modo multi-fila: cada acorde es una fila de piano
  if (chords.length > 0) {
    return (
      <div className="retro-keyboard-container" ref={containerRef}>
        <div className="piano-rows">
          {chords.map((chord, index) => (
            <PianoRow
              key={chord.name || index}
              chordName={chord.name}
              chordNotes={chord.notes || []}
              color={CHORD_COLORS[index % CHORD_COLORS.length]}
              onNotePress={onNotePress}
              activeNotes={activeSet}
            />
          ))}
        </div>
      </div>
    );
  }

  // Modo single: un solo teclado completo
  return (
    <div className="retro-keyboard-container" ref={containerRef}>
      <PianoRow
        chordName=""
        chordNotes={[]}
        color="#5b9bd5"
        onNotePress={onNotePress}
        activeNotes={activeSet}
      />
    </div>
  );
}
