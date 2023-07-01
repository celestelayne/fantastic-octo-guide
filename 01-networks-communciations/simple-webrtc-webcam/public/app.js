console.log('this works')

// Select the HTML5 video
const video = document.getElementById('video');
const btn = document.getElementById('button');

// constraints
const constraints = {
  audio: false,
  video: true
  // video: {
  //   mandatory: {
  //     minAspectRatio: 1.777,
  //     maxAspectRation: 1.778
  //   },
  //   optional: [
  //     { maxWidth: 640 },
  //     { minWidth: 480 },
  //   ]
  // }
}

const startStream = async () => {
  // Prompt the user for permission, get the stream
  navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    // attach to video object
    video.srcObject = stream;

  }).catch(err => {
    // always check for errors
    console.error(`${err.name}: ${err.message}`);
  })
}
btn.addEventListener('click', startStream)