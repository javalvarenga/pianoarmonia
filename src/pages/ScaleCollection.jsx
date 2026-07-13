import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import CollectionList from '../components/CollectionList.jsx';
import { collections } from '../data/collections.js';

const ScaleCollection = () => {
  const { note } = useParams();
  
  // Mapeo de notas en español a IDs de colección
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
  
  // Filtrar colecciones
  let filteredCollections = [];
  
  if (collectionId) {
    // Buscar la colección exacta
    const exactCollection = collections.find(c => c.id === collectionId);
    if (exactCollection) {
      filteredCollections.push(exactCollection);
    }
    
    // También buscar la versión menor
    const minorId = collectionId.replace('-major', '-minor');
    const minorCollection = collections.find(c => c.id === minorId);
    if (minorCollection) {
      filteredCollections.push(minorCollection);
    }
    
    // Si no hay coincidencias exactas, buscar por prefijo
    if (filteredCollections.length === 0) {
      const prefix = collectionId.split('-')[0];
      filteredCollections = collections.filter(c => c.id.startsWith(prefix));
    }
  }
  
  return (
    <Layout>
      <div className="collections-container">
        <CollectionList data={filteredCollections} />
      </div>
    </Layout>
  );
};

export default ScaleCollection;