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

// Generar acordes para cada escala de blues
const cBluesChords = generateScaleChords('C', 'blues');
const dBluesChords = generateScaleChords('D', 'blues');
const eBluesChords = generateScaleChords('E', 'blues');
const fBluesChords = generateScaleChords('F', 'blues');
const gBluesChords = generateScaleChords('G', 'blues');
const aBluesChords = generateScaleChords('A', 'blues');
const bBluesChords = generateScaleChords('B', 'blues');

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
  },
  // ===== Escalas de Blues =====
  {
    id: 'c-blues',
    name: 'Escala de Blues de DO',
    mode: 'blues',
    chords: [
      {
        note: 'C',
        chords: cBluesChords
      }
    ]
  },
  {
    id: 'd-blues',
    name: 'Escala de Blues de RE',
    mode: 'blues',
    chords: [
      {
        note: 'D',
        chords: dBluesChords
      }
    ]
  },
  {
    id: 'e-blues',
    name: 'Escala de Blues de MI',
    mode: 'blues',
    chords: [
      {
        note: 'E',
        chords: eBluesChords
      }
    ]
  },
  {
    id: 'f-blues',
    name: 'Escala de Blues de FA',
    mode: 'blues',
    chords: [
      {
        note: 'F',
        chords: fBluesChords
      }
    ]
  },
  {
    id: 'g-blues',
    name: 'Escala de Blues de SOL',
    mode: 'blues',
    chords: [
      {
        note: 'G',
        chords: gBluesChords
      }
    ]
  },
  {
    id: 'a-blues',
    name: 'Escala de Blues de LA',
    mode: 'blues',
    chords: [
      {
        note: 'A',
        chords: aBluesChords
      }
    ]
  },
  {
    id: 'b-blues',
    name: 'Escala de Blues de SI',
    mode: 'blues',
    chords: [
      {
        note: 'B',
        chords: bBluesChords
      }
    ]
  }
];
