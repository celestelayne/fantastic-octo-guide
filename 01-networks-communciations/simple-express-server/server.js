// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
// establish which port you’d like to use
const port = 3000

// dummy data
const fruits = ['apples', 'bananas', 'oranges']
const animals = ['cats', 'birds', 'zebra']

app.use(express.static('public'))

// define route handler for GET requests to the server
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the chat app</h1>")
})

app.get('/fruits', (req, res) => {
    // send all the fruit
    res.send(fruits)
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})