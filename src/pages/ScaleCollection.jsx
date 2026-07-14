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
  
  // Mapeo de notas en español a mayúsculas para filtrado
  const noteToUpperCaseMap = {
    'do': 'C',
    're': 'D',
    'mi': 'E',
    'fa': 'F',
    'sol': 'G',
    'la': 'A',
    'si': 'B'
  };
  
  // Obtener el ID de la colección basado en la nota y el modo
  const collectionId = noteMap[note] || '';
  
  // Encontrar la colección específica
  const collection = collections.find(c => c.id === collectionId);
  
  // Eliminamos el filtro por root.note para mostrar todos los acordes de la escala
  const filteredCollection = collection ? {
    ...collection,
    chords: collection.chords
  } : null;
  
  // Obtener el primer acorde de la colección filtrada
  const firstRoot = filteredCollection?.chords?.[0];
  const firstChord = firstRoot?.chords?.[0];
  const scaleProp = firstRoot ? `${firstRoot.note} ${mode}` : `${note} ${mode}`;
  const chordProp = firstChord ? `${firstRoot.note}${firstChord.quality}` : undefined;
  
  return (
    <div className="collections-container">
      {filteredCollection ? (
        <>
          <CollectionList data={[filteredCollection]} />
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