const http = require("http")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8000;

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);

// Routing
app.use(express.static('public'));

io.on('connection', socket => {
  console.log('user connection') // see this line in the Terminal

  // when the client emits 'message', this listens and executes
  socket.on('message', message => {
    console.log('Message received from client: ', message) // see this line in the Terminal
    io.emit('message', message)
    // io.sockets.emit('message', message)
  })

  // when the user disconnects...perform this
  socket.on('disconnect', () => {
    console.log('user disconnection') // see this line in the Terminal
  })
});

server.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`)
})