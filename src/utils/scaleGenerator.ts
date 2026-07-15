import { Note, Scale, Chord, Interval } from '@tonaljs/tonal';

// Mapeo de bemoles (y enarmónicos) a su equivalente en sostenidos
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

/**
 * Normaliza un nombre de nota a su representación con sostenidos.
 * Acepta notas con o sin octava (ej: "Eb", "Eb4", "Bb2").
 * Esto permite que notas con bemol coincidan con el layout del teclado
 * que está basado en sostenidos (C#, D#, F#, G#, A#).
 */
export function normalizeNote(note: string): string {
  const match = note.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return note;
  const [, noteName, rest] = match;
  const normalized = FLAT_TO_SHARP[noteName] || noteName;
  return `${normalized}${rest}`;
}

// Cualidades de acordes por grado para cada modo
const CHORD_QUALITIES: Record<string, string[]> = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'],
  minor: ['m', 'dim', '', 'm', 'm', '', ''],
  // Escala de blues (6 grados): I7, IIm, III7, IVdim, V7, VIm
  blues: ['7', 'm', '7', 'dim', '7', 'm'],
};

// Función para obtener el nombre del acorde basado en la nota y el grado
export function getChordName(tonic: string, mode: string, degree: number): string {
  const qualities = CHORD_QUALITIES[mode];
  if (!qualities) return tonic;

  const scale = Scale.get(`${tonic} ${mode}`).notes;
  if (scale.length >= degree) {
    const rootNote = scale[degree - 1];
    return `${rootNote}${qualities[degree - 1] || ''}`;
  }

  // Fallback: retornar la nota tónica si no se puede determinar
  return tonic;
}

// Función para generar los acordes de una escala
// Usa la librería tonal para obtener la formación (notas) de cada acorde
export function generateScaleChords(tonic: string, mode: string = 'major') {
  const qualities = CHORD_QUALITIES[mode];
  if (!qualities) return [];

  // Obtener las notas de la escala mediante tonal
  const scaleNotes = Scale.get(`${tonic} ${mode}`).notes;

  // Numeración romana para los grados
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

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
