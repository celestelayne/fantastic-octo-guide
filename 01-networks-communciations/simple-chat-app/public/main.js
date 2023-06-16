console.log('this works')

const socket = io();

const form = document.querySelector('form');
const input = document.querySelector('input');

const sendMessageToServer = (event) => {
  event.preventDefault() // will prevent page reloading
  if(input.value){
    console.log(input.value) // see this line in the browser console
    socket.emit('chat message ', input.value)
    input.value = ""
  }
}

form.addEventListener('submit', sendMessageToServer)