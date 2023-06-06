// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
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
