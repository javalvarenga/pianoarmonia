import React from 'react';
import { collections } from '../data/collections.js';
import Layout from '../components/Layout.jsx';
import CollectionList from '../components/CollectionList.jsx';

const Home = () => {
  // Tomar las primeras 5 colecciones
  const recentCollections = collections.slice(0, 5);

  return (
    <Layout>
      <h1>¡Bienvenido!</h1>
      <CollectionList data={recentCollections} title="Colecciones recientes" />
    </Layout>
  );
};

export default Home;