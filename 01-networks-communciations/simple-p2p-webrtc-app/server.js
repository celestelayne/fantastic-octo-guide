const http = require("http")
const express = require("express")

const app = express()
const port = process.env.PORT || 8000;

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);

// routes
app.use(express.static('public'));

const users = {}

io.on('connection', socket => {
  console.log('user connection')

  users[socket.id] = { 
    id: socket.id 
  };

  socket.on('offer', (peerId, offer) => {
    console.log(`Received offer from ${socket.id} to ${peerId}`);
  })

  socket.on('answer', (peerId, answer) => {
    console.log(`Received answer from ${socket.id} to ${peerId}`);
  })

  socket.on('candidate', (peerId, candidate) => {
    console.log(`Received candidate from ${socket.id} to ${peerId}`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete users[socket.id];
  });
});

// server
server.listen(port, () => {
  console.log(`Server working on port ${port}`)
})
