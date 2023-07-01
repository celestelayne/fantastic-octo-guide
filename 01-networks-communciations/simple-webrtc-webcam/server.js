require('dotenv').config()
// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
const fs = require('fs')

let options = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt')
}

const server = require("https").Server(options, app);

// establish which port you’d like to use
const PORT = 3000
// middleware
app.use(express.static('public'))
// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
