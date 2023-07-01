console.log('this is the receiver');

const socket = io();

const camera = document.getElementById('video');

// listening for connection on server
socket.on(`connect`, () => {
  // see this line in the browser console
  console.log(`User connected on: ${socket.id}`)
})

// listening for disconnection on server
socket.on(`disconnect`, () => {
  console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
});