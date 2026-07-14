export const majorScaleIntervals = [2, 2, 1, 2, 2, 2, 1];
export const minorScaleIntervals = [2, 1, 2, 2, 1, 2, 2];

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
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const chordTypes = {
    major: ['', 'm', 'm', '', '', 'm', 'dim'],
    minor: ['m', 'dim', '', 'm', 'm', '', '']
  };
  
  const numeral = romanNumerals[degree - 1];
  const type = chordTypes[mode][degree - 1];
  
  return `${tonic} ${numeral}${type}`;
};