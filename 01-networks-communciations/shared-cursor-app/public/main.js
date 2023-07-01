console.log('main.js is linked')

const socket = io();

// handler sending chat message to server and resetting the input
const handleMouseMove = event => {
  // console.log(event.clientX)
  if(socket.connect){
    // send cursor state to the server as type "state_update"
    socket.emit('state_update', {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight
    }) // message event
  }
}

// add event listener to the window object
window.addEventListener(`mousemove`, event => handleMouseMove(event));

socket.on('state_update', users => {
  console.log('list of users', users)
  // we need to iterate over this list of users
  for (const userId in users) {
    console.log('User ID: ', userId)
    let cursor = document.querySelector(`#cursor-${userId}`);
    
    // check if no cursor exists
    if(!cursor){
      // then create one
      cursor = document.createElement('div')
      // add a class of cursor ... see style.css file for details
      cursor.classList.add('cursor')
      cursor.setAttribute('id', `#cursor-${userId}`)
      document.body.appendChild(cursor)
    }
    console.log('cursor', cursor)
    // update the cursor location
    cursor.style.left = `${users[userId].x * window.innerWidth}px`
    cursor.style.top = `${users[userId].y * window.innerHeight}px`
  }
})

// listening for connection on server
socket.on(`connection`, () => {
  // see this line in the browser console
  console.log(`User connected on: ${socket.id}`)
})

// listening for disconnection on server
// socket.on(`disconnect`, () => {
//   console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
// });