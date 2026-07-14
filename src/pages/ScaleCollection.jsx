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
  
  // Obtener el primer acorde de la colección
  const firstRoot = collection?.chords?.[0];
  const firstChord = firstRoot?.chords?.[0];
  const scaleProp = firstRoot ? `${firstRoot.note} ${mode}` : `${note} ${mode}`;
  const chordProp = firstChord ? `${firstRoot.note}${firstChord.quality}` : undefined;
  
  return (
    <div className="collections-container">
      {collection ? (
        <>
          <CollectionList data={[collection]} />
          <div className="piano-highlight-container">
            <Piano 
              scale={scaleProp}
              chord={chordProp}
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