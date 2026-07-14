import { generateScaleChords } from '../utils/scaleGenerator.js';

// Generar acordes para cada escala
const cMajorChords = generateScaleChords('C', 'major');
const dMajorChords = generateScaleChords('D', 'major');
const eMajorChords = generateScaleChords('E', 'major');
const fMajorChords = generateScaleChords('F', 'major');
const gMajorChords = generateScaleChords('G', 'major');
const aMajorChords = generateScaleChords('A', 'major');
const bMajorChords = generateScaleChords('B', 'major');

export const collections = [
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
  }
];