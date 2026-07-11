/**
 * Tipos de acordes soportados
 */
export type ChordType = 
  | 'major' 
  | 'minor' 
  | 'dim' 
  | 'aug' 
  | '7' 
  | 'maj7' 
  | 'm7' 
  | '9' 
  | 'dom9' 
  | 'maj9' 
  | 'm9';

/**
 * Mapeo de intervalos (semitonos) desde la raíz para cada tipo de acorde
 */
const CHORD_INTERVALS: Record<ChordType, number[]> = {
  'major': [0, 4, 7],
  'minor': [0, 3, 7],
  'dim': [0, 3, 6],
  'aug': [0, 4, 8],
  '7': [0, 4, 7, 10],
  'maj7': [0, 4, 7, 11],
  'm7': [0, 3, 7, 10],
  '9': [0, 4, 7, 10, 14],
  'dom9': [0, 4, 7, 10, 14],
  'maj9': [0, 4, 7, 11, 14],
  'm9': [0, 3, 7, 10, 14]
};

/**
 * Mapeo de notas a su valor MIDI relativo dentro de una octava
 */
const NOTE_TO_MIDI: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

/**
 * Calcula los números MIDI de las notas que forman un acorde.
 * 
 * @param {number | string} root - Nota raíz. Puede ser un número MIDI (ej. 60 para C4) 
 *                                  o un string con nota y octava (ej. 'C4', 'Eb3').
 * @param {ChordType} type - El tipo de acorde a generar.
 * @returns {number[]} Un arreglo con los números MIDI de los tonos que forman el acorde.
 * @throws {Error} Si el formato de la raíz string es inválido o el tipo de acorde no está soportado.
 */
export function MapChords(root: number | string, type: ChordType): number[] {
  let rootMidi: number;

  if (typeof root === 'number') {
    rootMidi = root;
  } else {
    // Parsear string tipo 'C4' o 'Eb3'
    const match = root.match(/^([A-G][#b]?)([0-9-]+)$/);
    if (!match) {
      throw new Error(`Invalid root note format: ${root}. Expected format like 'C4' or 'Eb3'.`);
    }
    
    const noteName = match[1];
    const octave = parseInt(match[2], 10);
    const noteValue = NOTE_TO_MIDI[noteName];

    if (noteValue === undefined) {
      throw new Error(`Unsupported note name: ${noteName}`);
    }

    // Fórmula MIDI: (octava + 1) * 12 + nota
    rootMidi = (octave + 1) * 12 + noteValue;
  }

  const intervals = CHORD_INTERVALS[type];
  if (!intervals) {
    throw new Error(`Unsupported chord type: ${type}`);
  }

  return intervals.map(interval => rootMidi + interval);
}

export default MapChords;