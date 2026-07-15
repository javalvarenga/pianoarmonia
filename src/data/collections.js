import { generateScaleChords } from '../utils/scaleGenerator.ts';

// Definición de notas naturales con sus etiquetas en español
const NOTES = [
  { note: 'C', label: 'DO' },
  { note: 'D', label: 'RE' },
  { note: 'E', label: 'MI' },
  { note: 'F', label: 'FA' },
  { note: 'G', label: 'SOL' },
  { note: 'A', label: 'LA' },
  { note: 'B', label: 'SI' },
];

// Definición de los 19 tipos de escala con sus nombres en español
const SCALES = [
  { mode: 'major', name: 'Mayor' },
  { mode: 'minorNatural', name: 'Menor Natural' },
  { mode: 'minorHarmonic', name: 'Menor Armónica' },
  { mode: 'minorMelodic', name: 'Menor Melódica' },
  { mode: 'ionian', name: 'Jónica' },
  { mode: 'dorian', name: 'Dórica' },
  { mode: 'phrygian', name: 'Frigia' },
  { mode: 'lydian', name: 'Lidia' },
  { mode: 'mixolydian', name: 'Mixolidia' },
  { mode: 'aeolian', name: 'Eólica' },
  { mode: 'locrian', name: 'Locria' },
  { mode: 'pentatonicMajor', name: 'Pentatónica Mayor' },
  { mode: 'pentatonicMinor', name: 'Pentatónica Menor' },
  { mode: 'blues', name: 'Blues' },
  { mode: 'wholeTone', name: 'Tonos Enteros' },
  { mode: 'diminished', name: 'Disminuida' },
  { mode: 'bebopMajor', name: 'Bebop Mayor' },
  { mode: 'bebopDominant', name: 'Bebop Dominante' },
  { mode: 'bebopMinor', name: 'Bebop Menor' },
];

// Generar todas las colecciones: 7 notas × 19 escalas = 133 colecciones
export const collections = NOTES.flatMap(noteInfo =>
  SCALES.map(scale => ({
    id: `${noteInfo.note.toLowerCase()}-${scale.mode}`,
    name: `Escala ${scale.name} de ${noteInfo.label}`,
    mode: scale.mode,
    chords: [
      {
        note: noteInfo.note,
        chords: generateScaleChords(noteInfo.note, scale.mode)
      }
    ]
  }))
);
