import React, { useRef } from 'react';
import * as Tone from 'tone';

const Acorde = ({ chordDetails, chordColor }) => {
  const synthRef = useRef(null);

  const playChord = async () => {
    await Tone.start();

    if (!synthRef.current) {
      synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    }

    const synth = synthRef.current;
    // TODO: play sound — reproducir las notas del acorde
    const notes = chordDetails.notes || [];
    if (notes.length > 0) {
      synth.triggerAttackRelease(notes, '2n');
    }
  };

  return (
    <div className="acorde-component">
      <div className="acorde-info">
        <h4 className="chord-name" style={{ color: chordColor }}>
          {chordDetails.name || chordDetails.symbol}
        </h4>
        <div className="notes-info">
          <span className="notes-label">Notas:</span>
          <span className="notes-list">{chordDetails.notes.join(', ')}</span>
        </div>
      </div>
      <button
        className="chord-play-button"
        onClick={playChord}
        aria-label={`Reproducir acorde ${chordDetails.name || chordDetails.symbol}`}
        title={`Reproducir acorde ${chordDetails.name || chordDetails.symbol}`}
      >
        ▶
      </button>
    </div>
  );
};

export default Acorde;