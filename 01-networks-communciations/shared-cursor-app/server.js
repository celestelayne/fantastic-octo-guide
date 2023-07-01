const http = require("http")
const express = require("express")

const app = express()
const port = process.env.PORT || 8000;

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);

// routes
app.use(express.static('public'));

// create lookup object
const users = {}

io.on('connection', socket => {
  console.log('user connection', socket.id)
  // create value for connected socket id
  users[socket.id] = { id: socket.id }

  users[socket.id].x = 0;
  users[socket.id].y = 0;


  socket.on('state_update', userData => {
    // console.log('state_update', userData)
    users[socket.id].x = userData.x;
    users[socket.id].y = userData.y;
  })
});

server.listen(port, () => {
  console.log(`Socket.io server listening on port ${port}`)
  setInterval(() => {
    io.sockets.emit('state_update', users);
  }, 100);
})
