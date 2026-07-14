import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionList from '../components/CollectionList.jsx';
import Piano from '../components/Piano.jsx';
import { collections } from '../data/collections.js';

const ScaleCollection = () => {
  const { note, mode } = useParams();
  
  // Mapeo de notas en español a IDs de colección
  const noteMap = {
    'do': `c-${mode}`,
    're': `d-${mode}`,
    'mi': `e-${mode}`,
    'fa': `f-${mode}`,
    'sol': `g-${mode}`,
    'la': `a-${mode}`,
    'si': `b-${mode}`
  };
  
  // Obtener el ID de la colección basado en la nota y el modo
  const collectionId = noteMap[note] || '';
  
  // Filtrar colecciones
  const filteredCollections = collections.filter(c => c.id === collectionId);
  
  // Encontrar la colección específica
  const collection = collections.find(c => c.id === collectionId);
  
  return (
    <div className="collections-container">
      {collection ? (
        <>
          <CollectionList data={[collection]} />
          <div className="piano-highlight-container">
            <Piano 
              notes={collection.chords.flatMap(chord => chord.notes)} 
              title={`Piano - Escala de ${note.toUpperCase()} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
            />
          </div>
        </>
      ) : (
        <div className="empty-collection-message">
          <p>No se encontraron acordes para la escala seleccionada.</p>
        </div>
      )}
    </div>
  );
};

export default ScaleCollection;