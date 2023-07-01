console.log('this is the sender')

const socket = io();

const camera = document.getElementById('video');
const btn = document.getElementById('button');

// constraints
const constraints = {
  audio: false,
  video: {
    mandatory: {
      minAspectRatio: 1.777,
      maxAspectRation: 1.778
    },
    optional: [
      { maxWidth: 640 },
      { minWidth: 480 },
    ]
  }
}

const startStream = async () => {
  // Prompt the user for permission, get the stream
  navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    // attach to video object
    camera.srcObject = stream;

  }).catch(err => {
    // always check for errors
    console.error(`${err.name}: ${err.message}`);
  })
}
btn.addEventListener('click', startStream)

// listening for connection on server
socket.on(`connect`, () => {
  // see this line in the browser console
  console.log(`User connected on: ${socket.id}`)
})

// listening for disconnection on server
socket.on(`disconnect`, () => {
  console.log(`User disconnected: ${socket.id}`); // see this line in the browser console
});