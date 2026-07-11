import React from 'react';
import Piano from './Piano.jsx';
import './CollectionList.css';

/**
 * Componente CollectionList que renderiza una lista de colecciones musicales
 * estructuradas por Colección -> Nota Raíz (chords) -> Acorde (qualities).
 */
const CollectionList = ({ data = [] }) => {
  return (
    <div className="collection-list">
      <h2>
        Colecciones Musicales
      </h2>
      
      {!data || data.length === 0 ? (
        <p className="empty-message">No hay colecciones disponibles.</p>
      ) : (
        data.map((collection, colIndex) => (
          <div key={`col-${colIndex}`} className="collection-item">
            <h3>
              {collection?.name || 'Colección sin nombre'}
            </h3>
            
            {collection.chords && Array.isArray(collection.chords) ? (
              collection.chords.map((rootNoteGroup, rootIndex) => (
                <div key={`root-${rootIndex}`} className="root-note-section">
                  <h4 className="root-note-title">
                    Raíz: {rootNoteGroup.note}
                  </h4>
                  
                  <div className="chords-grid">
                    {rootNoteGroup.qualities && Array.isArray(rootNoteGroup.qualities) ? (
                      rootNoteGroup.qualities.map((chord, chordIndex) => {
                        const noteColors = {};
                        const colorIdx = (chordIndex + rootIndex) % 8;
                        const colorClass = `color-degree-${colorIdx}`;
                        
                        if (Array.isArray(chord.notes)) {
                          chord.notes.forEach(note => {
                            noteColors[note] = colorClass;
                          });
                        }

                        return (
                          <div key={`chord-${chordIndex}`} className="degree-card">
                            <div className="card-header">
                              <h4>{chord.name}</h4>
                              {chord.quality && (
                                <span className="quality-display">
                                  {chord.quality}
                                </span>
                              )}
                            </div>
                            <div className="piano-wrapper">
                              <Piano noteColors={noteColors} />
                            </div>
                            <p className="notes-info">
                              <strong className={`notes-label label-degree-${colorIdx}`}>
                                Notas:
                              </strong> {Array.isArray(chord.notes) && chord.notes.length > 0 
                                ? chord.notes.join(', ') 
                                : 'Sin notas definidas'}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="empty-chord-message">No hay acordes definidos para esta nota.</p>
                    )}
                  </div>
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