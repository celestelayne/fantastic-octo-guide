console.log('main.js is loaded')

// establish socket.io connection
const socket = io();

// query the HTML elements
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const messages = document.querySelector('.messages-container');
const chatContainer = document.querySelector('.chat-container');
// const username = prompt('Please enter username: ', "")


// handler sending chat message to server and resetting the input
const sendMessageToServer = (event) => {
  event.preventDefault() // will prevent form submission from refreshing the page
  // store input value in a variable
  let message = chatInput.value
  // check that there is acually a value in the input field
  if(message && socket.connected){
    console.log(chatInput.value) // see this line in the browser console
    // send input value to the server as type "message"
    socket.emit('message', message)
    // reset input value
    chatInput.value = ""
  }
}
// add event listener to form submission
chatForm.addEventListener('submit', sendMessageToServer)

// add chat message to webpage
const addMessageToPage = message => {
  console.log(`Message received from server: ${message}`);
  // create new list item element
  const li = document.createElement('li')
  // add message to the elements text
  li.textContent = message
  // add to list of messages
  messages.appendChild(li)
}

 // listening for messages on the server .. when it emits a 'message', update the chat body
socket.on('message', addMessageToPage)

// display message when user is connected
const alertUserConnected = () => {
  console.log(`User connected: ${socket.id}`);
  addMessageToPage('User connected')
}
// listening for connection on server
socket.on('connection', alertUserConnected);

// listening for disconnection on server
socket.on(`disconnect`, () => {
  console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
});