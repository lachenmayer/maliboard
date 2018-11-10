const messages = require('./messages')

const fastify = require('fastify')({
  logger: false,
})

fastify.register(require('fastify-websocket'), { handle })
fastify.register(require('fastify-static'), {
  root: __dirname + '/sounds',
  prefix: '/sounds',
})
fastify.register(require('fastify-bankai'), {
  entry: './client.js',
  watch: true,
})

const sockets = {}
let ids = 0

function broadcast(sender, message) {
  for (const [id, socket] of Object.entries(sockets)) {
    if (id === sender) continue
    const encoded = messages.Broadcast.encode({ sender, message })
    socket.write(encoded)
  }
}

function handle(socket) {
  const id = ids++
  connect()

  socket.on('data', message => {
    const decoded = messages.Message.decode(message)
    broadcast(id, decoded)
  })
  socket.on('error', err => {
    console.log(err.code)
    disconnect()
  })
  socket.on('end', () => {
    console.log('end')
    disconnect()
  })

  function connect() {
    sockets[id] = socket
    console.log('connect', id, 'open sockets:', Object.keys(sockets).length)
  }

  function disconnect() {
    delete sockets[id]
    console.log('disconnect', id, 'open sockets:', Object.keys(sockets).length)
  }
}

fastify.listen(3000, '::')
