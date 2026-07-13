import React, { useState, useEffect, useCallback } from 'react';
import './Piano.css';
import * as Tone from 'tone';
import { Scale, Chord } from 'tonal';
import RetroKeyboard from './RetroKeyboard.jsx';

const Piano = ({ onPlayNote, onStopNote, activeNotes, scale, chord }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  
  // Generar notas de la escala
  const scaleNotes = Scale.get(scale).notes || [];
  
  // Generar notas del acorde
  const chordNotes = Chord.get(chord).notes || [];
  
  // Combinar notas de escala y acorde
  const highlightedNotes = [...new Set([...scaleNotes, ...chordNotes])];
  
  // Calcular colores para las notas
  const noteColors = {};
  highlightedNotes.forEach((note, index) => {
    // Usar colores cíclicos para las notas
    const colors = [
      '#FF6B6B', // Rojo
      '#4ECDC4', // Turquesa
      '#45B7D1', // Azul
      '#96CEB4', // Verde
      '#FFEAA7', // Amarillo
      '#DDA0DD', // Ciruela
      '#98D8C8', // Verde agua
      '#F7DC6F', // Oro
      '#BB8FCE', // Lavanda
      '#85C1E9', // Celeste
      '#F8C471', // Melocotón
      '#82E0AA'  // Menta
    ];
    noteColors[note] = colors[index % colors.length];
  });
  
  const handleKeyDown = useCallback((note) => {
    setPressedKeys(prev => new Set(prev).add(note));
    if (onPlayNote) onPlayNote(note);
  }, [onPlayNote]);

  const handleKeyUp = useCallback((note) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
    if (onStopNote) onStopNote(note);
  }, [onStopNote]);

  return (
    <div className="piano-container">
      <h3 className="piano-title">Piano Interactivo</h3>
      <div className="piano-keyboard-section">
        <RetroKeyboard 
          noteColors={noteColors}
          pressedKeys={pressedKeys}
          onKeyPress={handleKeyDown}
          onKeyRelease={handleKeyUp}
        />
      </div>
    </div>
  );
};

export default Piano;