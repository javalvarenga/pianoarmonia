import React, { useMemo, useState } from 'react';
import './RetroKeyboard.css';

const NATURAL = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
/** Índice de la tecla blanca a la izquierda de cada negra (por octava). */
const BLACK_AFTER_WHITE = {
  'C#': 0, // entre C y D
  'D#': 1, // entre D y E
  'F#': 3, // entre F y G
  'G#': 4, // entre G y A
  'A#': 5, // entre A y B
};

/**
 * Teclado de 2 octavas (C4–B5): 14 blancas + 10 negras en disposición real.
 * Las teclas base son blanco/negro; el resaltado de acorde es opcional.
 */
const RetroKeyboard = ({ getNoteColor, isChordNote }) => {
  const keys = useMemo(() => {
    const list = [];
    let whiteIndex = 0;

    for (let octave = 4; octave <= 5; octave++) {
      for (const name of NATURAL) {
        list.push({
          note: `${name}${octave}`,
          type: 'white',
          whiteIndex,
        });
        whiteIndex += 1;
      }

      const octaveWhiteBase = (octave - 4) * 7;
      for (const [sharp, after] of Object.entries(BLACK_AFTER_WHITE)) {
        list.push({
          note: `${sharp}${octave}`,
          type: 'black',
          // Centro de la negra = borde entre blanca `after` y la siguiente
          whiteIndex: octaveWhiteBase + after,
        });
      }
    }

    return list;
  }, []);

  const whiteCount = 14;
  const [pressedKeys, setPressedKeys] = useState(() => new Set());

  const handleKeyDown = (note) => {
    setPressedKeys((prev) => new Set(prev).add(note));
  };

  const handleKeyUp = (note) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  };

  return (
    <div className="retro-keyboard-container">
      <div
        className="piano-keys"
        style={{ '--white-count': whiteCount }}
      >
        {keys.map((key) => {
          const isPressed = pressedKeys.has(key.note);
          const isChord = isChordNote ? isChordNote(key.note) : false;
          const color = getNoteColor ? getNoteColor(key.note) : '';

          return (
            <div
              key={key.note}
              className={`key ${key.type}-key${isPressed ? ' active' : ''}${isChord ? ' chord-note' : ''}`}
              style={{
                '--white-index': key.whiteIndex,
                ...(color ? { '--note-color': color } : {}),
              }}
              onMouseDown={() => handleKeyDown(key.note)}
              onMouseUp={() => handleKeyUp(key.note)}
              onMouseLeave={() => handleKeyUp(key.note)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown(key.note);
              }}
              onTouchEnd={() => handleKeyUp(key.note)}
            >
              <span className="key-label">{key.note}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RetroKeyboard;
