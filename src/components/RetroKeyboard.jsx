import React, { useState, useCallback } from 'react';
import { Scale, Chord } from 'tonal';
import './RetroKeyboard.css';

const RetroKeyboard = ({ scale, chord, getNoteColor }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  
  // Definir las notas base del piano (2 octavas)
  const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Generar notas para 2 octavas
  const allNotes = [];
  for (let octave = 3; octave <= 4; octave++) {
    baseNotes.forEach(note => {
      allNotes.push(`${note}${octave}`);
    });
  }
  
  // Obtener notas de la escala
  const scaleNotes = Scale.get(scale).notes || [];
  
  // Obtener notas del acorde usando Chord en lugar de Note
  const chordNotes = [];
  if (chord) {
    const chordObj = Chord.get(chord);
    if (chordObj && chordObj.notes) {
      chordNotes.push(...chordObj.notes);
    }
  }
  
  // Combinar notas destacadas
  const highlightedNotes = [...new Set([...scaleNotes, ...chordNotes])];
  
  // Crear objeto de colores para las notas (clave es la nota sin octava)
  const noteColors = {};
  highlightedNotes.forEach(note => {
    const baseNote = note.replace(/[0-9]/g, '');
    noteColors[baseNote] = getNoteColor(baseNote);
  });
  
  // Calcular la posición de las teclas
  const getPosition = (note) => {
    const noteWithoutOctave = note.replace(/[0-9]/g, '');
    const octave = parseInt(note.slice(-1));
    
    // Encontrar el índice de la nota base
    const baseIndex = baseNotes.indexOf(noteWithoutOctave);
    
    // Calcular posición considerando la octava
    return baseIndex + (octave - 3) * 12;
  };
  
  // Renderizar teclas blancas
  const renderWhiteKeys = () => {
    // Notas blancas
    const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    return allNotes
      .filter(note => whiteNotes.includes(note.replace(/[0-9]/g, '')))
      .map((note) => {
        const isPressed = pressedKeys.has(note);
        const noteWithoutOctave = note.replace(/[0-9]/g, '');
        const isHighlighted = highlightedNotes.some(highlighted => 
          highlighted.replace(/[0-9]/g, '') === noteWithoutOctave
        );
        
        // Obtener color si está resaltada
        const color = noteColors[noteWithoutOctave] || '';
        
        return (
          <div
            key={note}
            className={`key white-key ${isPressed ? 'active' : ''} ${isHighlighted ? 'colored' : ''}`}
            style={{
              '--position': getPosition(note),
              '--note-color': color
            }}
            onMouseDown={() => setPressedKeys(prev => new Set(prev).add(note))}
            onMouseUp={() => setPressedKeys(prev => {
              const newSet = new Set(prev);
              newSet.delete(note);
              return newSet;
            })}
            onMouseLeave={() => {
              if (isPressed) {
                setPressedKeys(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(note);
                  return newSet;
                });
              }
            }}
          >
            <span className="key-label">{note}</span>
          </div>
        );
      });
  };
  
  // Renderizar teclas negras
  const renderBlackKeys = () => {
    // Notas negras
    const blackNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];
    
    return allNotes
      .filter(note => blackNotes.includes(note.replace(/[0-9]/g, '')))
      .map((note) => {
        const isPressed = pressedKeys.has(note);
        const noteWithoutOctave = note.replace(/[0-9]/g, '');
        const isHighlighted = highlightedNotes.some(highlighted => 
          highlighted.replace(/[0-9]/g, '') === noteWithoutOctave
        );
        
        // Obtener color si está resaltada
        const color = noteColors[noteWithoutOctave] || '';
        
        return (
          <div
            key={note}
            className={`key black-key ${isPressed ? 'active' : ''} ${isHighlighted ? 'colored' : ''}`}
            style={{
              '--position': getPosition(note),
              '--note-color': color
            }}
            onMouseDown={() => setPressedKeys(prev => new Set(prev).add(note))}
            onMouseUp={() => setPressedKeys(prev => {
              const newSet = new Set(prev);
              newSet.delete(note);
              return newSet;
            })}
            onMouseLeave={() => {
              if (isPressed) {
                setPressedKeys(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(note);
                  return newSet;
                });
              }
            }}
          >
            <span className="key-label">{note}</span>
          </div>
        );
      });
  };
  
  return (
    <div className="retro-keyboard-container">
      <div className="retro-keyboard">
        {renderWhiteKeys()}
        {renderBlackKeys()}
      </div>
    </div>
  );
};

export default RetroKeyboard;