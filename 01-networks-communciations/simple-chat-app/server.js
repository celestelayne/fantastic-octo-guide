const http = require("http")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8000;

const server = http.createServer(app)
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to the chat app</h1>")
// })

io.on('connection', socket => {
  // console.log('connection', socket)
  socket.on('chat message', msg => {
    console.log('chat message says: ' + msg)
  })
});



server.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`)
})