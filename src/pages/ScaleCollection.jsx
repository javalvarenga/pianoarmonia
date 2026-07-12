import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionList from '../components/CollectionList.jsx';
import Layout from '../components/Layout.jsx';
import { collections } from '../data/collections.js';

function ScaleCollection() {
  const { note } = useParams();
  
  // Mapeo de notas en español a IDs de colecciones
  const noteMap = {
    'do': 'c-major',
    're': 'd-major',
    'mi': 'e-major',
    'fa': 'f-major',
    'sol': 'g-major',
    'la': 'a-major',
    'si': 'b-major'
  };
  
  // Obtener el ID de la colección basado en la nota
  const collectionId = noteMap[note];
  
  // Filtrar colecciones basadas en la nota seleccionada
  const filteredCollections = collections.filter(collection => 
    collection.id === collectionId || collection.id === `${collectionId.replace('-major', '-minor')}`
  );
  
  // Si no hay coincidencias exactas, buscamos por prefijo
  if (filteredCollections.length === 0) {
    const prefix = collectionId?.split('-')[0];
    if (prefix) {
      collections.forEach(collection => {
        if (collection.id.startsWith(prefix)) {
          filteredCollections.push(collection);
        }
      });
    }
  }
  
  return (
    <Layout>
      <div className="collections-container">
        <CollectionList data={filteredCollections} />
      </div>
    </Layout>
  );
}

export default ScaleCollection;