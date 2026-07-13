import React from 'react';

const Acorde = ({ chordDetails, chordColor }) => {
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
    </div>
  );
};

export default Acorde;