/**
 * Definiciones de intervalos musicales (en semitonos).
 * Este módulo centraliza los patrones de intervalos para escalas y modos.
 */
export const Intervalos: Record<string, number[]> = {
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

export default Intervalos;
