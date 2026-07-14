import React, { useState, useCallback } from 'react';
import './Piano.css';
import RetroKeyboard from './RetroKeyboard.jsx';
import Piano from './Piano.jsx';

const PianoRetro = ({ activeNotes = [] }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // Determinar color para una nota basada en los acordes activos
  const getNoteColor = useCallback((note) => {
    if (!activeNotes.includes(note)) return '';
    
    // Colores para diferentes notas del acorde
    const colorMap = {
      'C': '#ff6b6b',
      'D': '#4ecdc4',
      'E': '#45b7d1',
      'F': '#96ceb4',
      'G': '#feca57',
      'A': '#ff9ff3',
      'B': '#54a0ff',
      'C#': '#ff6348',
      'D#': '#00d2d3',
      'F#': '#ff9f43',
      'G#': '#c44569',
      'A#': '#5f27cd',
    };
    
    return colorMap[note] || '#b58900';
  }, [activeNotes]);

  const handleKeyDown = (note) => {
    setPressedKeys(prev => new Set(prev).add(note));
  };

  const handleKeyUp = (note) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  };

  // Crear objeto noteColors para pasar al RetroKeyboard
  const noteColors = {};
  activeNotes.forEach(note => {
    noteColors[note] = getNoteColor(note);
  });

  return (
    <div className="retro-piano-container">
      <div className="piano-keyboard-section">
        <h2>Piano Retro</h2>
        <p>Haz clic en las teclas para tocar notas</p>
        <RetroKeyboard />
      </div>
    </div>
  );
};

export default PianoRetro;