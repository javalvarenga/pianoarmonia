import React, { useState, useEffect } from 'react';
import './purePiano.css';
import Sostenidos from './Sostenidos.jsx'; // Importación corregida

/**
 * Componente PurePiano que renderiza un teclado de piano básico.
 * Recibe únicamente noteColors para determinar qué teclas resaltar y con qué color.
 */
const PurePiano = ({ noteColors = {}, onKeyPress = () => {} }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al cargar
    checkIsMobile();

    // Agregar event listener
    window.addEventListener('resize', checkIsMobile);

    // Limpiar event listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Constantes para definir el rango de octavas
  const START_OCTAVE = 3;
  const END_OCTAVE = 4;

  // Generar notas blancas para el rango de octavas especificado
  const generateWhiteNotes = () => {
    const whiteNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const notes = [];
    
    for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
      whiteNoteNames.forEach(note => {
        notes.push(`${note}${octave}`);
      });
    }
    
    return notes;
  };

  const whiteNotes = generateWhiteNotes();
  
  // Función para obtener el color de una nota
  const getNoteColor = (note) => {
    return noteColors[note] || 'transparent';
  };

  // Función para determinar si una nota debe tener borde
  const hasNoteColor = (note) => {
    return noteColors[note] && noteColors[note] !== 'transparent';
  };

  return (
    <div className="piano-container">
      <div className="piano">
        {/* Teclas blancas */}
        <div className="white-keys">
          {whiteNotes.map((note) => (
            <div 
              key={note}
              className={`white-key ${hasNoteColor(note) ? 'highlighted' : ''}`}
              style={{
                backgroundColor: hasNoteColor(note) ? getNoteColor(note) : 'white',
                borderColor: hasNoteColor(note) ? getNoteColor(note) : '#ccc'
              }}
              onClick={() => onKeyPress(note)}
            >
              <span className="key-label">{note}</span>
            </div>
          ))}
        </div>
        
        {/* Teclas negras (sostenidos) */}
        <Sostenidos 
          noteColors={noteColors}
          onKeyPress={onKeyPress}
          getNoteColor={getNoteColor}
          hasNoteColor={hasNoteColor}
          startOctave={START_OCTAVE}
          endOctave={END_OCTAVE}
        />
      </div>
      
      {/* Indicador de notas activas */}
      {Object.keys(noteColors).length > 0 && (
        <div className="active-notes-indicator">
          <h4>Notas resaltadas:</h4>
          <div className="notes-container">
            {Object.entries(noteColors).map(([note, color]) => (
              <div key={note} className="note-item">
                <div 
                  className="note-color-box" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="note-name">{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurePiano;