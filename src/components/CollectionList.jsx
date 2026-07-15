import React from 'react';
import Piano from './Piano.jsx';
import Acorde from './Acorde.jsx';
import './CollectionList.css';
import { Chord, Scale } from '@tonaljs/tonal';
import { getChordName } from '../utils/scaleGenerator.ts';

/**
 * Componente CollectionList que renderiza una lista de colecciones musicales
 * estructuradas por Colección -> Nota Raíz (chords) -> Acorde (qualities).
 */
const CollectionList = ({ data = [] }) => {
  // Función para obtener colores por grado
  const getColorByDegree = (degree) => {
    const colorMap = {
      1: '#FF6B6B', // Rojo
      2: '#4ECDC4', // Turquesa
      3: '#45B7D1', // Azul
      4: '#96CEB4', // Verde
      5: '#FFEAA7', // Amarillo
      6: '#DDA0DD', // Ciruela
      7: '#98D8C8', // Verde agua
      8: '#F7DC6F', // Oro
      9: '#BB8FCE', // Lavanda
      10: '#85C1E9', // Celeste
      11: '#F8C471', // Melocotón
      12: '#82E0AA'  // Menta
    };
    return colorMap[degree] || '#CCCCCC'; // Gris por defecto
  };

  // Filtrar colecciones que tienen acordes
  const validCollections = data.filter(collection => 
    collection.chords && collection.chords.length > 0
  );

  if (validCollections.length === 0) {
    return (
      <div className="collection-list">
        <h2>Colecciones Musicales</h2>
        <p className="empty-message">No hay colecciones definidas.</p>
      </div>
    );
  }

  return (
    <div className="collection-list">
      <h2>Colecciones Musicales</h2>
      {validCollections.map((collection) => {
        // Obtener las notas de la escala para mostrarlas en el piano inicial
        const tonic = collection.chords[0]?.note;
        const scaleNotes = tonic && collection.mode
          ? Scale.get(`${tonic} ${collection.mode}`).notes
          : [];
        const scaleLabel = tonic && collection.mode
          ? `${tonic} ${collection.mode}`
          : '';

        return (
          <div key={collection.id} className="collection-item">
            <h3 className="collection-title">{collection.name}</h3>
            {/* Piano con todas las notas de la escala resaltadas */}
            {scaleNotes.length > 0 && (
              <div className="collection-scale-piano">
                <Piano
                  scale={scaleLabel}
                  scaleNotes={scaleNotes}
                />
              </div>
            )}
            <div className="collection-content">
              {collection.chords && collection.chords.length > 0 ? (
                <div className="chords-list">
                  {collection.chords.map((rootNote) => (
                    rootNote.chords && rootNote.chords.length > 0 ? (
                      rootNote.chords.map((chord, chordIndex) => {
                        // Crear el acorde usando Tonal
                        const chordSymbol = chord.chordSymbol || getChordName(rootNote.note, collection.mode, chord.degree);
                        const chordDetails = Chord.get(chordSymbol);
                        
                        // Usar el color del acorde si está definido, de lo contrario calcular por grado
                        const chordColor = chord.color || getColorByDegree(chord.degree || (chordIndex % 12) + 1);
                        
                        return (
                          <div key={`${collection.id}-${rootNote.note}-${chord.quality}`} className="chord-row">
                            <div className="chord-info">
                              <div className="card-header">
                                <h4 className="chord-name" style={{ color: chordColor }}>
                                  {chordDetails.name || chordSymbol}
                                </h4>
                                <span className="quality-display">
                                  {chord.quality}
                                </span>
                              </div>
                              <div className="notes-info">
                                <span className="notes-label">Notas:</span> 
                                <span className="notes-list">{chordDetails.notes.join(', ')}</span>
                              </div>
                            </div>
                            <div className="piano-wrapper">
                              <Piano 
                                scale={`${rootNote.note} ${chord.quality}`}
                                chord={chordSymbol}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : null
                  ))}
                </div>
              ) : (
                <p className="empty-collection-message">No hay acordes definidos para esta colección.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionList;
