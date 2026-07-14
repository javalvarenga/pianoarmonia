import { Note, Scale, Chord, Interval } from '@tonaljs/tonal';

// Función para obtener el nombre del acorde basado en la nota y el grado
export function getChordName(tonic: string, mode: string, degree: number): string {
  // Solo implementamos la lógica para la escala mayor por ahora
  if (mode === 'major') {
    const chords = [
      '',    // I - Mayor
      'm',   // II - Menor
      'm',   // III - Menor
      '',    // IV - Mayor
      '',    // V - Mayor
      'm',   // VI - Menor
      'dim'  // VII - Disminuido
    ];
    
    // Obtener las notas de la escala
    const scale = Scale.get(`${tonic} major`).notes;
    
    // Asegurarnos de que tenemos la escala correcta
    if (scale.length >= degree) {
      const rootNote = scale[degree - 1];
      return `${rootNote}${chords[degree - 1] || ''}`;
    }
  }
  
  // Fallback: retornar la nota tónica si no se puede determinar
  return tonic;
}

// Función para generar los acordes de una escala
export function generateScaleChords(tonic: string, mode: string = 'major') {
  if (mode === 'major') {
    // Definir los acordes para la escala mayor
    const chordQualities = [
      '',    // I - Mayor
      'm',   // II - Menor
      'm',   // III - Menor
      '',    // IV - Mayor
      '',    // V - Mayor
      'm',   // VI - Menor
      'dim'  // VII - Disminuido
    ];
    
    // Obtener las notas de la escala
    const scaleNotes = Scale.get(`${tonic} major`).notes;
    
    // Generar los acordes con el grado en números romanos
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    
    return scaleNotes.map((note, index) => ({
      degree: romanNumerals[index],
      note: note,
      quality: chordQualities[index] || '',
      chordSymbol: `${note}${chordQualities[index] || ''}`
    }));
  }
  
  // Para otras escalas, retornar un array vacío por ahora
  return [];
}
