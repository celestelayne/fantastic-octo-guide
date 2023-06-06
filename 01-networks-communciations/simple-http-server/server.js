const http = require("http");
const fs = require('fs').promises;

const host = "localhost";
const port = 8000;

const requestListener = (req, res) => {
  fs.readFile(__dirname + "/index.html")
  .then(content => {
    res.setHeader("Content-Type", "text/html")
    res.writeHead(200)
    res.end(content)
  })
  .catch(err => {
    res.writeHead(500)
    res.end(err)
    return
  })
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})