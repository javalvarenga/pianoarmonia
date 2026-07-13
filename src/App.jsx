import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Selector.css';
import Piano from './components/Piano.jsx';
import ScaleSelector from './components/ScaleSelector.jsx';
import ChordSelector from './components/ChordSelector.jsx';
import NoteDisplay from './components/NoteDisplay.jsx';
import Selector from './components/Selector.jsx';
import * as Tone from 'tone';

function App() {
  const [currentScale, setCurrentScale] = useState('C major');
  const [currentChord, setCurrentChord] = useState('C');
  const [activeNotes, setActiveNotes] = useState([]);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    setSynth(newSynth);
    
    return () => {
      newSynth.dispose();
    };
  }, []);

  const handlePlayNote = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, '8n');
    }
  };

  const handleStopNote = (note) => {
    if (synth) {
      synth.triggerRelease(note);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Piano Armonía</h1>
        <p>Explora escalas y acordes musicales</p>
      </header>
      
      <main className="app-main">
        <div className="selectors-container">
          <ScaleSelector 
            currentScale={currentScale} 
            onScaleChange={setCurrentScale} 
          />
          <ChordSelector 
            currentChord={currentChord} 
            onChordChange={setCurrentChord} 
          />
        </div>
        
        <NoteDisplay 
          scale={currentScale} 
          chord={currentChord} 
        />
        
        <Piano 
          onPlayNote={handlePlayNote}
          onStopNote={handleStopNote}
          activeNotes={activeNotes}
          scale={currentScale}
          chord={currentChord}
        />
      </main>
      
      <footer className="app-footer">
        <p>© 2023 Piano Armonía - Explora la música</p>
      </footer>
    </div>
  );
}

export default App;