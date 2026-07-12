import React from 'react';
import PurePiano from './PurePiano.jsx';
import * as Tone from 'tone';
import './pianoShared.css';

const PianoKeyboard = () => {
  // Definimos un sintetizador simple de Tone.js
  // Usamos un PolySynth para permitir múltiples notas simultáneas
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const handleKeyClick = (note) => {
    if (!note) return;
    
    // Tone.js requiere que el contexto de audio esté iniciado
    if (Tone.context.state !== 'running') {
      Tone.start();
    }

    // Activar el sonido de la nota presionada
    // '8n' representa una nota de corchea
    synth.triggerAttackRelease(note, '8n');
  };

  return (
    <div className="piano-wrapper">
      <div className="piano-keyboard-section">
        <h2>Teclado Interactivo</h2>
        <p>Haz clic en las teclas para sonar</p>
        <PurePiano 
          onKeyPress={handleKeyClick}
        />
      </div>
    </div>
  );
};

export default PianoKeyboard;