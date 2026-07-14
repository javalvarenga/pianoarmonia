import React, { useState, useCallback } from 'react';
import { Scale, Chord } from 'tonal';

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
  
  // Crear objeto de colores para las notas
  const noteColors = {};
  highlightedNotes.forEach(note => {
    noteColors[note] = getNoteColor(note);
  });
  
  const handleKeyDown = useCallback((note) => {
    setPressedKeys(prev => new Set(prev).add(note));
  }, []);

  const handleKeyUp = useCallback((note) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  }, []);

  // Determinar si una nota es negra (sostenida/bemol)
  const isBlackKey = (note) => {
    return note.includes('#') || note.includes('b');
  };

  // Calcular la posición de las teclas
  const getPosition = (note) => {
    const noteBase = note.replace(/[0-9]/g, '');
    const baseIndex = baseNotes.indexOf(noteBase);
    const octave = parseInt(note.match(/[0-9]/)[0]);
    return (octave - 3) * 12 + baseIndex;
  };

  // Renderizar teclas blancas
  const renderWhiteKeys = () => {
    return allNotes
      .filter(note => !isBlackKey(note))
      .map((note, index) => {
        const position = getPosition(note);
        const isHighlighted = highlightedNotes.includes(note.replace(/[0-9]/g, ''));
        const isPressed = pressedKeys.has(note);
        const color = isHighlighted ? noteColors[note.replace(/[0-9]/g, '')] : '';
        
        return (
          <div 
            key={note}
            className={`key white ${isHighlighted ? 'note-colored' : ''} ${isPressed ? 'active' : ''}`}
            style={{
              '--position': position,
              '--note-color': color
            }}
            onMouseDown={() => handleKeyDown(note)}
            onMouseUp={() => handleKeyUp(note)}
            onMouseLeave={() => isPressed && handleKeyUp(note)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleKeyDown(note);
            }}
            onTouchEnd={() => handleKeyUp(note)}
          >
            <span className="note-label">{note.replace(/[0-9]/g, '')}</span>
          </div>
        );
      });
  };

  // Renderizar teclas negras
  const renderBlackKeys = () => {
    return allNotes
      .filter(note => isBlackKey(note))
      .map((note, index) => {
        const position = getPosition(note);
        const isHighlighted = highlightedNotes.includes(note.replace(/[0-9]/g, ''));
        const isPressed = pressedKeys.has(note);
        const color = isHighlighted ? noteColors[note.replace(/[0-9]/g, '')] : '';
        
        return (
          <div 
            key={note}
            className={`key black ${isHighlighted ? 'note-colored' : ''} ${isPressed ? 'active' : ''}`}
            style={{
              '--position': position,
              '--note-color': color
            }}
            onMouseDown={() => handleKeyDown(note)}
            onMouseUp={() => handleKeyUp(note)}
            onMouseLeave={() => isPressed && handleKeyUp(note)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleKeyDown(note);
            }}
            onTouchEnd={() => handleKeyUp(note)}
          >
            <span className="note-label">{note.replace(/[0-9]/g, '')}</span>
          </div>
        );
      });
  };

  return (
    <div className="piano-keys">
      {renderWhiteKeys()}
      {renderBlackKeys()}
    </div>
  );
};

export default RetroKeyboard;