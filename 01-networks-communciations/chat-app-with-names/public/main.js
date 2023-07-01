console.log('main.js file loaded')

// establish socket.io connection
const socket = io();

// query the HTML elements
const chatForm = document.querySelector('.chat-form');
const nameForm = document.querySelector('.name-form');

const chatInput = document.querySelector('.chat-input');
const nameInput = document.querySelector('.name-input');

const chatContainer = document.querySelector('.chat-container');

// handler sending chat message to server and resetting the input
const sendMessageToServer = (event) => {
  // will prevent form submission from refreshing the page
  event.preventDefault()
  if(chatInput.value && socket.connect){
    console.log(chatInput.value)
    // send input value to the server as type "message"
    socket.emit('message', chatInput.value) // message event
  }
  // reset input value
  chatInput.value = ""
}
// add event listener to chat form submission
chatForm.addEventListener('submit', sendMessageToServer)

// handler sending user name to server
const sendUsernameToServer = (event) => {
  event.preventDefault()
  if(nameInput.value){
    socket.emit('name', nameInput.value); // name event
  }
  // reset input value
  nameInput.value = ""
}
// add event listener to name form submission
nameForm.addEventListener('submit', sendUsernameToServer)

// add chat message to webpage
const addMessageToPage = (sender, message) => {
  console.log('what is this? ', sender, message) // check here
    // create new list item element
    const li = document.createElement('li')
    // add message to the elements text
    li.innerHTML = `<span>${sender.name}: ${message}</span>`
    // add to list of messages
    chatContainer.appendChild(li)
}

// listen for the message event
socket.on('message', addMessageToPage)

// listening for connection on server
socket.on(`connection`, () => {
  // see this line in the browser console
  console.log(`User connected on: ${socket.id}`)
})

// listening for disconnection on server
socket.on(`disconnect`, () => {
  console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
});