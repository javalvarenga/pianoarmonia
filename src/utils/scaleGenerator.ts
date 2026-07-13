import { Scale, Note, Interval } from '@tonaljs/tonal';

export interface ScaleInfo {
  name: string;
  notes: string[];
  intervals: string[];
  degrees: string[];
}

export function generateScaleInfo(tonic: string, scaleName: string): ScaleInfo | null {
  try {
    const scale = Scale.get(`${tonic} ${scaleName}`);
    
    if (!scale.notes || scale.notes.length === 0) {
      return null;
    }
    
    // Obtener los intervalos desde la tónica
    const intervals = scale.notes.map(note => {
      const interval = Interval.distance(tonic, note);
      return interval || '';
    });
    
    // Generar los grados (I, II, III, etc.)
    const degrees = scale.notes.map((_, index) => {
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
      return romanNumerals[index] || '';
    });
    
    return {
      name: scale.name,
      notes: scale.notes,
      intervals,
      degrees
    };
  } catch (error) {
    console.error(`Error generando información de escala para ${tonic} ${scaleName}:`, error);
    return null;
  }
}

export function getAllScalesForTonic(tonic: string): ScaleInfo[] {
  const scaleNames = Scale.names();
  const scales: ScaleInfo[] = [];
  
  for (const scaleName of scaleNames) {
    const scaleInfo = generateScaleInfo(tonic, scaleName);
    if (scaleInfo) {
      scales.push(scaleInfo);
    }
  }
  
  return scales;
}

export function getNoteWithOctave(note: string, octave: number): string {
  return Note.pitchClass(note) + octave;
}
