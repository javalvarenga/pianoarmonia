import { generateScaleChords } from '../utils/scaleGenerator.ts';

// Generar acordes para cada escala mayor
const cMajorChords = generateScaleChords('C', 'major');
const dMajorChords = generateScaleChords('D', 'major');
const eMajorChords = generateScaleChords('E', 'major');
const fMajorChords = generateScaleChords('F', 'major');
const gMajorChords = generateScaleChords('G', 'major');
const aMajorChords = generateScaleChords('A', 'major');
const bMajorChords = generateScaleChords('B', 'major');

// Generar acordes para cada escala menor
const cMinorChords = generateScaleChords('C', 'minor');
const dMinorChords = generateScaleChords('D', 'minor');
const eMinorChords = generateScaleChords('E', 'minor');
const fMinorChords = generateScaleChords('F', 'minor');
const gMinorChords = generateScaleChords('G', 'minor');
const aMinorChords = generateScaleChords('A', 'minor');
const bMinorChords = generateScaleChords('B', 'minor');

export const collections = [
  // ===== Escalas Mayores =====
  {
    id: 'c-major',
    name: 'Escala Mayor de DO',
    mode: 'major',
    chords: [
      {
        note: 'C',
        chords: cMajorChords
      }
    ]
  },
  {
    id: 'd-major',
    name: 'Escala Mayor de RE',
    mode: 'major',
    chords: [
      {
        note: 'D',
        chords: dMajorChords
      }
    ]
  },
  {
    id: 'e-major',
    name: 'Escala Mayor de MI',
    mode: 'major',
    chords: [
      {
        note: 'E',
        chords: eMajorChords
      }
    ]
  },
  {
    id: 'f-major',
    name: 'Escala Mayor de FA',
    mode: 'major',
    chords: [
      {
        note: 'F',
        chords: fMajorChords
      }
    ]
  },
  {
    id: 'g-major',
    name: 'Escala Mayor de SOL',
    mode: 'major',
    chords: [
      {
        note: 'G',
        chords: gMajorChords
      }
    ]
  },
  {
    id: 'a-major',
    name: 'Escala Mayor de LA',
    mode: 'major',
    chords: [
      {
        note: 'A',
        chords: aMajorChords
      }
    ]
  },
  {
    id: 'b-major',
    name: 'Escala Mayor de SI',
    mode: 'major',
    chords: [
      {
        note: 'B',
        chords: bMajorChords
      }
    ]
  },
  // ===== Escalas Menores =====
  {
    id: 'c-minor',
    name: 'Escala Menor de DO',
    mode: 'minor',
    chords: [
      {
        note: 'C',
        chords: cMinorChords
      }
    ]
  },
  {
    id: 'd-minor',
    name: 'Escala Menor de RE',
    mode: 'minor',
    chords: [
      {
        note: 'D',
        chords: dMinorChords
      }
    ]
  },
  {
    id: 'e-minor',
    name: 'Escala Menor de MI',
    mode: 'minor',
    chords: [
      {
        note: 'E',
        chords: eMinorChords
      }
    ]
  },
  {
    id: 'f-minor',
    name: 'Escala Menor de FA',
    mode: 'minor',
    chords: [
      {
        note: 'F',
        chords: fMinorChords
      }
    ]
  },
  {
    id: 'g-minor',
    name: 'Escala Menor de SOL',
    mode: 'minor',
    chords: [
      {
        note: 'G',
        chords: gMinorChords
      }
    ]
  },
  {
    id: 'a-minor',
    name: 'Escala Menor de LA',
    mode: 'minor',
    chords: [
      {
        note: 'A',
        chords: aMinorChords
      }
    ]
  },
  {
    id: 'b-minor',
    name: 'Escala Menor de SI',
    mode: 'minor',
    chords: [
      {
        note: 'B',
        chords: bMinorChords
      }
    ]
  }
];
