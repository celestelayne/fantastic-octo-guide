console.log('this is the mobile client')

const socket = io()
let controllerSocketId;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
controllerSocketId = urlParams.get('id')

console.log('L10: ', controllerSocketId)

// listening for connection on server
socket.on('connect', () => {
  console.log(`Mobile user connected on: ${socket.id}`)
})

// handler sending chat message to server and resetting the input
const handleMouseMove = event => {
  if(socket.connected){
    console.log('mousemove', event.clientX, event.clientY)
    // send cursor state to the server as type "state_update"
    socket.emit('update', controllerSocketId, {
      x: event.clientX / window.innerWidth,
      y: event.y / window.innerHeight
    })
  }
}

const handleTouchMove = event => {
  if(socket.connected){
    console.log(event.touches[0].clientX, event.touches[0].clientY)
    // send cursor state to the server as type "state_update"
    socket.emit('update', controllerSocketId, {
      x: event.touches[0].clientX / window.innerWidth,
      y: event.touches[0].clientY / window.innerHeight
    })
  }
}

// add event listener to the window object
window.addEventListener(`mousemove`, event => handleMouseMove(event));
window.addEventListener(`touchmove`, event => handleTouchMove(event));

