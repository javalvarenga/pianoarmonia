// Colecciones musicales con acordes estructurados
// Cada colección contiene una serie de notas raíz, y cada nota raíz contiene una serie de acordes

export const collections = [
  {
    id: "c-major",
    name: "Escala de Do Mayor",
    chords: [
      {
        note: "C",
        chords: [
          { quality: "maj" },
          { quality: "m" },
          { quality: "7" },
          { quality: "maj7" },
          { quality: "m7" }
        ]
      },
      {
        note: "D",
        chords: [
          { quality: "m" },
          { quality: "7" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "F",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "G",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "A",
        chords: [
          { quality: "m" },
          { quality: "m7" }
        ]
      },
      {
        note: "B",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "d-major",
    name: "Escala de Re Mayor",
    chords: [
      {
        note: "D",
        chords: [
          { quality: "maj" },
          { quality: "m" },
          { quality: "7" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "F#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "G",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "A",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "B",
        chords: [
          { quality: "m" },
          { quality: "m7" }
        ]
      },
      {
        note: "C#",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "e-major",
    name: "Escala de Mi Mayor",
    chords: [
      {
        note: "E",
        chords: [
          { quality: "maj" },
          { quality: "m" }
        ]
      },
      {
        note: "F#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "G#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "A",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "B",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "C#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "D#",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "f-major",
    name: "Escala de Fa Mayor",
    chords: [
      {
        note: "F",
        chords: [
          { quality: "maj" },
          { quality: "m" },
          { quality: "7" }
        ]
      },
      {
        note: "G",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "A",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "Bb",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "C",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "D",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "g-major",
    name: "Escala de Sol Mayor",
    chords: [
      {
        note: "G",
        chords: [
          { quality: "maj" },
          { quality: "m" },
          { quality: "7" }
        ]
      },
      {
        note: "A",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "B",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "C",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "D",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "F#",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "a-major",
    name: "Escala de La Mayor",
    chords: [
      {
        note: "A",
        chords: [
          { quality: "maj" },
          { quality: "m" },
          { quality: "m7" }
        ]
      },
      {
        note: "B",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "C#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "D",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "maj" },
          { quality: "7" }
        ]
      },
      {
        note: "F#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "G#",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  },
  {
    id: "b-major",
    name: "Escala de Si Mayor",
    chords: [
      {
        note: "B",
        chords: [
          { quality: "maj" },
          { quality: "m" }
        ]
      },
      {
        note: "C#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "D#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "E",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "F#",
        chords: [
          { quality: "maj" }
        ]
      },
      {
        note: "G#",
        chords: [
          { quality: "m" }
        ]
      },
      {
        note: "A#",
        chords: [
          { quality: "dim" }
        ]
      }
    ]
  }
];