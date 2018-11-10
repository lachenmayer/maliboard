const Keyboard = require('audiokeys')
const blobToBuffer = require('blob-to-buffer')
const instruments = require('./instruments')
const messages = require('./messages')
const nanobus = require('nanobus')

const instrument = instruments.mali()

//
// BUS
//

const events = nanobus()
events.on('note_on', note => {
  instrument.triggerAttack(note.frequency)
})
events.on('note_off', note => {
  instrument.triggerRelease(note.frequency)
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
