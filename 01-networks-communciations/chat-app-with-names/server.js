const http = require("http")
const express = require("express")

const app = express()
const port = process.env.PORT || 8000;

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);

app.use(express.static('public'));

// create lookup object
let users = {}
let count = 0

io.on('connection', socket => {
  console.log('user connection')
  // create value for connected socket id
  users[socket.id] = { id: socket.id };

  socket.on('name', name => {
    // check terminal for correct name value
    console.log('name', name);
    // store name in lookup object
    users[socket.id].name = name;
    // send the name back as a confirmation
    socket.emit('name', name);
  })

  socket.on('message', message => {
    // check terminal for correct input value
    console.log('line 33: ', message, users[socket.id])
    // if there is no name ... exit
    if(!users[socket.id].name) {
      return
    };

    console.log(`Received message from client: ${message}`)
    // send message and user data back to client
    io.sockets.emit('message', users[socket.id], message)
  })

  // when the user disconnects...perform this
  socket.on('disconnect', () => {
    console.log('user disconnection') // see this line in the Terminal
    // delete connected socket id property from global users object
    delete users[socket.id]
  })
});

server.listen(port, () => {
    console.log(`Server working on port ${port}`)
})
