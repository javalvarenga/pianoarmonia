import React from 'react';
import PurePiano from './PurePiano.jsx';
import * as Tone from 'tone';

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
    <div className="piano-keyboard-section" style={{ width: '100%', margin: '20px 0', textAlign: 'center' }}>
      <h2 style={{ color: '#2c3e50' }}>Teclado Interactivo</h2>
      <p>Haz clic en las teclas para sonar</p>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PurePiano 
          onKeyPress={handleKeyClick}
        />
      </div>
    </div>
  );
};

export default PianoKeyboard;