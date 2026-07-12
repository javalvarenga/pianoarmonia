import React from 'react';
import Piano from './Piano.jsx';
import './CollectionList.css';
import { Chord } from '@tonaljs/tonal';

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
  const filteredData = data.filter(collection => 
    collection.chords && 
    Array.isArray(collection.chords) && 
    collection.chords.length > 0 &&
    collection.chords.some(rootNoteGroup => 
      rootNoteGroup.chords && 
      Array.isArray(rootNoteGroup.chords) && 
      rootNoteGroup.chords.length > 0
    )
  );

  return (
    <div className="collection-list">
      <h2>
        Colecciones Musicales
      </h2>
      
      {!filteredData || filteredData.length === 0 ? (
        <p className="empty-message">No hay colecciones disponibles.</p>
      ) : (
        filteredData.map((collection, colIndex) => (
          <div key={`col-${colIndex}`} className="collection-item">
            <h3>
              {collection?.name || 'Colección sin nombre'}
            </h3>
            
            {collection.chords && Array.isArray(collection.chords) && collection.chords.length > 0 ? (
              collection.chords.map((rootNoteGroup, rootIndex) => (
                <div key={`root-${rootIndex}`} className="root-note-section">
                  <h4 className="root-note-title">
                    Raíz: {rootNoteGroup.note}
                  </h4>
                  
                  {rootNoteGroup.chords && Array.isArray(rootNoteGroup.chords) && rootNoteGroup.chords.length > 0 ? (
                    rootNoteGroup.chords.map((chord, chordIndex) => {
                      // Obtener notas del acorde usando Tonal
                      const chordSymbol = `${rootNoteGroup.note}${chord.quality}`;
                      const chordData = Chord.get(chordSymbol);
                      const notes = chordData.notes;
                      
                      // Si no hay notas, mostrar mensaje de error
                      if (!notes || notes.length === 0) {
                        return (
                          <div key={`chord-${chordIndex}`} className="chord-item">
                            <div className="chord-header">
                              <h5 className="chord-name">
                                {chord.quality || 'Acorde sin nombre'}
                              </h5>
                              <p className="chord-notes error-message">
                                No hay notas definidas para este acorde.
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      // Crear un objeto para mapear notas a colores
                      const noteColors = {};
                      notes.forEach((note, index) => {
                        // Asignar colores según el grado de la nota en el acorde
                        const degree = (index % 12) + 1;
                        noteColors[note] = getColorByDegree(degree);
                      });
                      
                      return (
                        <div key={`chord-${chordIndex}`} className="chord-item">
                          <div className="chord-header">
                            <h5 className="chord-name">
                              {chord.quality || 'Acorde sin nombre'}
                            </h5>
                            
                            <p className="chord-notes">
                              <strong className="notes-label">
                                Notas:
                              </strong> {notes.join(', ')}
                            </p>
                          </div>
                          
                          <div className="piano-container">
                            <Piano noteColors={noteColors} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="empty-chord-message">No hay acordes definidos para esta nota.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-collection-message">Esta colección no contiene notas raíz.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionList;