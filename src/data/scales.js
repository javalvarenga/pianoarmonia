// Intervalos de escalas (en semitonos entre notas consecutivas)
export const scaleIntervals = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minorNatural: [2, 1, 2, 2, 1, 2, 2],
  minorHarmonic: [2, 1, 2, 2, 1, 3, 1],
  minorMelodic: [2, 1, 2, 2, 2, 2, 1],
  ionian: [2, 2, 1, 2, 2, 2, 1],
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian: [2, 1, 2, 2, 1, 2, 2],
  locrian: [1, 2, 2, 1, 2, 2, 2],
  pentatonicMajor: [2, 2, 3, 2, 3],
  pentatonicMinor: [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2],
  wholeTone: [2, 2, 2, 2, 2, 2],
  diminished: [2, 1, 2, 1, 2, 1, 2, 1],
  bebopMajor: [2, 2, 1, 2, 1, 1, 2, 1],
  bebopDominant: [2, 2, 1, 2, 2, 1, 1, 1],
  bebopMinor: [2, 1, 2, 2, 2, 1, 1, 1],
};

// Mantener compatibilidad con exports anteriores
export const majorScaleIntervals = scaleIntervals.major;
export const minorScaleIntervals = scaleIntervals.minorNatural;

export const notes = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];

export const getScaleNotes = (tonic, intervals) => {
  const startIndex = notes.indexOf(tonic);
  if (startIndex === -1) return [];
  
  const scaleNotes = [tonic];
  let currentIndex = startIndex;
  
  for (let i = 0; i < intervals.length; i++) {
    currentIndex = (currentIndex + intervals[i]) % notes.length;
    scaleNotes.push(notes[currentIndex]);
  }
  
  return scaleNotes;
};

export const getChordFromScale = (scaleNotes, degree) => {
  const rootIndex = (degree - 1) % scaleNotes.length;
  const thirdIndex = (rootIndex + 2) % scaleNotes.length;
  const fifthIndex = (rootIndex + 4) % scaleNotes.length;
  
  return [
    scaleNotes[rootIndex],
    scaleNotes[thirdIndex],
    scaleNotes[fifthIndex]
  ];
};

export const getChordName = (tonic, mode, degree) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const chordTypes = {
    major: ['', 'm', 'm', '', '', 'm', 'dim'],
    minorNatural: ['m', 'dim', '', 'm', 'm', '', ''],
    minorHarmonic: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
    minorMelodic: ['m', 'm', 'aug', '', '', 'm', 'dim'],
    ionian: ['', 'm', 'm', '', '', 'm', 'dim'],
    dorian: ['m', 'm', '', '', 'm', 'dim', ''],
    phrygian: ['m', '', '', 'm', 'dim', '', 'm'],
    lydian: ['', '', 'm', 'dim', '', 'm', 'm'],
    mixolydian: ['', 'm', 'dim', '', 'm', 'm', ''],
    aeolian: ['m', 'dim', '', 'm', 'm', '', ''],
    locrian: ['dim', '', 'm', 'm', '', '', 'm'],
    pentatonicMajor: ['', 'm', 'm', '', 'm'],
    pentatonicMinor: ['m', '', 'm', 'm', ''],
    blues: ['7', 'm', '7', 'dim', '7', 'm'],
    wholeTone: ['aug', 'aug', 'aug', 'aug', 'aug', 'aug'],
    diminished: ['dim7', '7', 'dim7', '7', 'dim7', '7', 'dim7', '7'],
    bebopMajor: ['', 'm', 'm', '', '', 'aug', 'm', 'dim'],
    bebopDominant: ['7', 'm7', 'm7b5', 'maj7', '7', 'm7', 'dim7', 'maj7'],
    bebopMinor: ['m7', 'm7', 'maj7', '7', 'm7', 'm7b5', 'maj7', 'm7b5'],
  };
  
  const numeral = romanNumerals[degree - 1];
  const type = chordTypes[mode] ? chordTypes[mode][degree - 1] : '';
  
  return `${tonic} ${numeral}${type}`;
};
