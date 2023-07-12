console.log('main.js is linked')

const socket = io();

//
let socketIds = [];

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
// window.addEventListener(`mousemove`, event => handleMouseMove(event));
window.addEventListener(`mousemove`, handleMouseMove);

socket.on('state_update', users => {
  console.log('list of users', users)
  // we need to iterate over this list of users
  for (const userId in users) {
    console.log('User ID: ', userId)

    // if cursor exists then grab it
    let cursor = document.querySelector(`#cursor-${userId}`);
    
    // check if no cursor exists
    if(!cursor){
      // then create one
      cursor = document.createElement('div')
      // add a class of cursor ... see style.css file for details
      cursor.classList.add('cursor')
      // set the id attribute
      cursor.setAttribute('id', `#cursor-${userId}`)
      // append the cursor to the webpage
      document.body.appendChild(cursor)
    }
    console.log('cursor', users[userId].x)
    console.log('width', window.innerWidth)
    // update the cursor location
    cursor.style.left = `${users[userId].x * window.innerWidth}px`
    cursor.style.top = `${users[userId].y * window.innerHeight}px`

    // different size
    // cursor.style.width =  `${users[userId].x * window.innerWidth / 2}px`
    // cursor.style.height = `${users[userId].x * window.innerHeight / 2}px`

    setTimeout(() => {
      cursor.className = "hide"
    }, 500)
  }


  const connectedSocketIds = Object.keys(users);
  const disconnectedSocketIds = socketIds.filter(userId => {
    return connectedSocketIds.indexOf(userId) === -1;
  })

  console.log('connected socket ids: ', connectedSocketIds, connectedSocketIds.length)
  console.log('disconnected socket ids: ', disconnectedSocketIds, disconnectedSocketIds.length)

  disconnectedSocketIds.forEach(userId => {
    const _cursor = document.querySelector(`#cursor-${userId}`);
    // if that cursor exists
    if(_cursor) {
      _cursor.parentNode.removeChild(_cursor);
    }
  })

  socketIds = connectedSocketIds;
})

// listening for connection on server
socket.on(`connection`, () => {
  // see this line in the browser console
  console.log(`User connected on: ${socket.id}`)
})

// listening for disconnection on server
socket.on(`disconnect`, () => {
  console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
});