const Keyboard = require('audiokeys')
const blobToBuffer = require('blob-to-buffer')
const messages = require('./messages')
const nanobus = require('nanobus')
const Tone = require('tone')

//
// SYNTH
//

const synth = new Tone.PolySynth(6, Tone.Synth, {
  oscillator: {
    partials: [0, 2, 3, 4, 8],
  },
}).toMaster()

//
// BUS
//

const events = nanobus()
events.on('note_on', note => {
  synth.triggerAttack(note.frequency)
})
events.on('note_off', note => {
  synth.triggerRelease(note.frequency)
})

events.on('receive', ({ sender, message }) => {
  for (let [event, payload] of Object.entries(message)) {
    console.log(sender, event, payload)
    events.emit(event, payload)
  }
})

//
// LOCAL
//

const keyboard = new Keyboard()
keyboard.down(note => {
  events.emit('send', { note_on: note })
  events.emit('note_on', note)
})
keyboard.up(note => {
  events.emit('send', { note_off: note })
  events.emit('note_off', note)
})

//
// REMOTE
//

const ws = new WebSocket(window.location.origin.replace(/^http/, 'ws'))
ws.addEventListener('open', () => {
  events.on('send', message => {
    const encoded = messages.Message.encode(message)
    ws.send(encoded)
  })
})
ws.addEventListener('message', message => {
  blobToBuffer(message.data, (err, buffer) => {
    if (err) console.log(err)
    const decoded = messages.Broadcast.decode(buffer)
    events.emit('receive', decoded)
  })
})
