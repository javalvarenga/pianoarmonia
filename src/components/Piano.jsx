import React from 'react';
import PurePiano from './PurePiano.jsx';
import './Piano.css';

/**
 * Componente Piano que actúa como envoltorio para PurePiano,
 * proporcionando el contenedor con estilos y contexto.
 */
const Piano = ({ noteColors = {} }) => {
  return (
    <div className="piano-container">
      <PurePiano noteColors={noteColors} />
    </div>
  );
};

export default Piano;