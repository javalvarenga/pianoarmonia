import { Chord, Interval as Intervalos } from 'tonal';
import * as Tonal from 'tonal';

// Mapeo de bemoles simples (y enarmónicos) a su equivalente en sostenidos
const FLAT_TO_SHARP: Record<string, string> = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
  'Cb': 'B',
  'Fb': 'E',
  'E#': 'F',
  'B#': 'C',
};

// Mapeo de dobles bemoles a su equivalente cromático en sostenidos
// Doble bemol = 2 semitonos atrás de la nota
const DOUBLE_FLAT_TO_SHARP: Record<string, string> = {
  'Cbb': 'A#', // C - 2 semitonos = Bb = A#
  'Dbb': 'C',  // D - 2 semitonos = C
  'Ebb': 'D',  // E - 2 semitonos = D
  'Fbb': 'D#', // F - 2 semitonos = Eb = D#
  'Gbb': 'F',  // G - 2 semitonos = F
  'Abb': 'G',  // A - 2 semitonos = G
  'Bbb': 'A',  // B - 2 semitonos = A
};

/**
 * Normaliza un nombre de nota a su representación con sostenidos.
 * Acepta notas con o sin octava (ej: "Eb", "Eb4", "Bb2", "Bbb", "Dbb4").
 * Soporta dobles bemoles (bb) = 2 semitonos atrás.
 */
export function normalizeNote(note: string): string {
  const match = note.match(/^([A-G](?:bb|b|#)?)(.*)$/);
  if (!match) return note;
  const [, noteName, rest] = match;

  if (DOUBLE_FLAT_TO_SHARP[noteName]) {
    return `${DOUBLE_FLAT_TO_SHARP[noteName]}${rest}`;
  }

  const normalized = FLAT_TO_SHARP[noteName] || noteName;
  return `${normalized}${rest}`;
}

// Notas cromáticas con sostenidos (coincide con el layout del teclado)
const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Intervalos (en semitonos) entre notas consecutivas para cada tipo de escala
export const SCALE_INTERVALS: Record<string, number[]> = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minorNatural: [2, 1, 2, 2, 1, 2, 2],
  minorHarmonic: [2, 1, 2, 2, 1, 3, 1],
  minorMelodic: [2, 1, 2, 2, 2, 2, 1],
  ionian: [2, 2, 1, 2, 2, 2, 1],
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian: [2, 1, 2, 2, 1, 2, 2],
  locrian: [1, 2, 2, 1, 2, 2, 2],
  pentatonicMajor: [2, 2, 3, 2, 3],
  pentatonicMinor: [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2],
  wholeTone: [2, 2, 2, 2, 2, 2],
  diminished: [2, 1, 2, 1, 2, 1, 2, 1],
  bebopMajor: [2, 2, 1, 2, 1, 1, 2, 1],
  bebopDominant: [2, 2, 1, 2, 2, 1, 1, 1],
  bebopMinor: [2, 1, 2, 2, 2, 1, 1, 1],
};

// Mapeo de nombres de modo a nombres que reconoce Tonal (para compatibilidad)
const TONAL_SCALE_MAP: Record<string, string> = {
  major: 'major',
  minorNatural: 'minor',
  minorHarmonic: 'harmonic minor',
  minorMelodic: 'melodic minor',
  ionian: 'ionian',
  dorian: 'dorian',
  phrygian: 'phrygian',
  lydian: 'lydian',
  mixolydian: 'mixolydian',
  aeolian: 'aeolian',
  locrian: 'locrian',
  pentatonicMajor: 'major pentatonic',
  pentatonicMinor: 'minor pentatonic',
  blues: 'blues',
  wholeTone: 'whole tone',
  diminished: 'diminished',
  bebopMajor: 'bebop major',
  bebopDominant: 'bebop dominant',
  bebopMinor: 'bebop minor',
};

/**
 * Devuelve el nombre de escala que Tonal reconoce para un modo dado.
 */
export function getTonalScaleName(mode: string): string {
  return TONAL_SCALE_MAP[mode] || mode;
}

/**
 * Genera las notas de una escala a partir de sus intervalos personalizados.
 * No depende del diccionario de escalas de Tonal, por lo que funciona con
 * cualquier tipo de escala definido en SCALE_INTERVALS.
 */
export function getScaleNotesFromIntervals(tonic: string, mode: string): string[] {
  const intervals = SCALE_INTERVALS[mode];
  if (!intervals) return [];

  const startIndex = CHROMATIC_NOTES.indexOf(tonic);
  if (startIndex === -1) return [];

  const notes: string[] = [];
  let currentIndex = startIndex;

  for (let i = 0; i < intervals.length; i++) {
    notes.push(CHROMATIC_NOTES[currentIndex]);
    currentIndex = (currentIndex + intervals[i]) % 12;
  }

  return notes;
}

// Cualidades de acordes por grado para cada modo
const CHORD_QUALITIES: Record<string, string[]> = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'],
  minorNatural: ['m', 'dim', '', 'm', 'm', '', ''],
  minorHarmonic: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
  minorMelodic: ['m', 'm', 'aug', '', '', 'm', 'dim'],
  ionian: ['', 'm', 'm', '', '', 'm', 'dim'],
  dorian: ['m', 'm', '', '', 'm', 'dim', ''],
  phrygian: ['m', '', '', 'm', 'dim', '', 'm'],
  lydian: ['', '', 'm', 'dim', '', 'm', 'm'],
  mixolydian: ['', 'm', 'dim', '', 'm', 'm', ''],
  aeolian: ['m', 'dim', '', 'm', 'm', '', ''],
  locrian: ['dim', '', 'm', 'm', '', '', 'm'],
  pentatonicMajor: ['', 'm', 'm', '', 'm'],
  pentatonicMinor: ['m', '', 'm', 'm', ''],
  blues: ['7', 'm', '7', 'dim', '7', 'm'],
  wholeTone: ['aug', 'aug', 'aug', 'aug', 'aug', 'aug'],
  diminished: ['dim7', '7', 'dim7', '7', 'dim7', '7', 'dim7', '7'],
  bebopMajor: ['', 'm', 'm', '', '', 'aug', 'm', 'dim'],
  bebopDominant: ['7', 'm7', 'm7b5', 'maj7', '7', 'm7', 'dim7', 'maj7'],
  bebopMinor: ['m7', 'm7', 'maj7', '7', 'm7', 'm7b5', 'maj7', 'm7b5'],
};

// Función para obtener el nombre del acorde basado en la nota y el grado
export function getChordName(tonic: string, mode: string, degree: number): string {
  const qualities = CHORD_QUALITIES[mode];
  if (!qualities) return tonic;

  const scale = getScaleNotesFromIntervals(tonic, mode);
  if (scale.length >= degree) {
    const rootNote = scale[degree - 1];
    return `${rootNote}${qualities[degree - 1] || ''}`;
  }

  // Fallback: retornar la nota tónica si no se puede determinar
  return tonic;
}

// Función para generar los acordes de una escala
// Usa getScaleNotesFromIntervals para obtener las notas de cada escala
export function generateScaleChords(tonic: string, mode: string = 'major') {
  const qualities = CHORD_QUALITIES[mode];
  if (!qualities) return [];

  const scaleNotes = getScaleNotesFromIntervals(tonic, mode);

  // Numeración romana para los grados (incluye VIII para escalas de 8 notas)
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  return scaleNotes.map((note, index) => {
    const quality = qualities[index] || '';
    const chordSymbol = `${note}${quality}`;

    // Usar tonal (Chord.get) para obtener la formación del acorde
    const chordData = Chord.get(chordSymbol);

    return {
      degree: romanNumerals[index],
      note: note,
      quality: quality,
      chordSymbol: chordSymbol,
      notes: chordData.notes || []
    };
  });
}
