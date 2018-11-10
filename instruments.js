const Tone = require('tone')

const instruments = {
  synth: () => {
    return new Tone.PolySynth(6, Tone.Synth, {
      oscillator: {
        partials: [0, 2, 3, 4, 8],
      },
    }).toMaster()
  },
  mali: () => {
    return new Tone.Sampler({
      C3: 'sounds/mali/C3.wav',
      'C#3': 'sounds/mali/Csharp.wav',
      D3: 'sounds/mali/D.wav',
      'D#3': 'sounds/mali/Dsharp.wav',
      E3: 'sounds/mali/E.wav',
      F3: 'sounds/mali/F.wav',
      'F#3': 'sounds/mali/Fsharp.wav',
      G3: 'sounds/mali/G.wav',
      'G#3': 'sounds/mali/Gsharp.wav',
      A4: 'sounds/mali/A.wav',
      'A#4': 'sounds/mali/Asharp.wav',
      B4: 'sounds/mali/B.wav',
      C4: 'sounds/mali/C4.wav',
    }).toMaster()
  },
}

module.exports = instruments
