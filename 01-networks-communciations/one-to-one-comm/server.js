const http = require("http")
const express = require("express")

const app = express()
const port = process.env.PORT || 8000;

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);

// routes
app.use(express.static('public'));

app.get('/', function (req, res) { 
  const protocol = req.protocol; 
  console.log('this is the protocol', protocol)
})

// create lookup object
const users = {}

io.on('connect', socket => {

  users[socket.id] = {
    id: socket.id
  };
  console.log('Server socket connected', socket.id);

  users[socket.id].x = 0;
  users[socket.id].y = 0;

  console.log('this is the user socket id: ', users[socket.id])

  socket.on('update', (controllerSocketId, controllerData) => {
    console.log('works now', controllerData)
    users[socket.id].x = controllerData.x;
    users[socket.id].y = controllerData.y;
    // forward update to this particular user
    io.to(controllerSocketId).emit('update', controllerData)
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
