const http = require("http")
const express = require("express")
const app = express()

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)
const io = require('socket.io')(server);


app.use(express.static('public'))

io.on('connection', socket => {
  console.log('connection')
});

server.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`)
})
