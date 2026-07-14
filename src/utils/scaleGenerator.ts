import { Note, Scale, Chord, Interval } from '@tonaljs/tonal';

// Cualidades de acordes por grado para cada modo
const CHORD_QUALITIES: Record<string, string[]> = {
  major: ['', 'm', 'm', '', '', 'm', 'dim'],
  minor: ['m', 'dim', '', 'm', 'm', '', '']
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
