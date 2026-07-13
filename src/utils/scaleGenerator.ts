import { Scale } from '@tonaljs/tonal';

/**
 * Genera las notas de una escala musical utilizando la librería tonal
 * @param root - La nota raíz de la escala (ej: "C", "D#", "Bb")
 * @param scaleName - El nombre de la escala (ej: "major", "minor", "dorian")
 * @returns Un arreglo de nombres de notas que componen la escala
 */
export function generateScale(root: string, scaleName: string): string[] {
  try {
    // Utiliza la librería tonal para obtener las notas de la escala
    const scale = Scale.get(`${root} ${scaleName}`);
    return scale.notes;
  } catch (error) {
    console.error(`Error generando la escala ${root} ${scaleName}:`, error);
    return [];
  }
}

export default generateScale;