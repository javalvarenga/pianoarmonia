import React from 'react';
import { Scale } from 'tonal';

const ScaleSelector = ({ currentScale, onScaleChange }) => {
  // Obtener todas las escalas disponibles
  const scales = Scale.names();
  
  return (
    <div className="selector-container">
      <label htmlFor="scale-select">Escala:</label>
      <select 
        id="scale-select"
        value={currentScale} 
        onChange={(e) => onScaleChange(e.target.value)}
        className="selector vintage-selector"
      >
        {scales.map(scale => (
          <option key={scale} value={scale}>{scale}</option>
        ))}
      </select>
    </div>
  );
};

export default ScaleSelector;