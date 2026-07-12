import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionList from '../components/CollectionList.jsx';
import Layout from '../components/Layout.jsx';
import { collections } from '../data/collections.js';

function ScaleCollection() {
  const { note } = useParams();
  
  // Mapear nombres de notas en español a inglés
  const noteMap = {
    'do': 'C',
    're': 'D',
    'mi': 'E',
    'fa': 'F',
    'sol': 'G',
    'la': 'A',
    'si': 'B'
  };
  
  const englishNote = noteMap[note.toLowerCase()];
  
  // Filtrar colecciones por la nota seleccionada
  const noteCollections = collections.filter(collection => 
    collection.id.startsWith(englishNote.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="collections-container">
        <h2>Escalas de {note.toUpperCase()}</h2>
        <CollectionList data={noteCollections} />
      </div>
    </Layout>
  );
}

export default ScaleCollection;