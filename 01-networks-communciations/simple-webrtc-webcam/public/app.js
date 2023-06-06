console.log('this works')

// Select the HTML5 video
const _video = document.getElementById('video')
const btn = document.getElementById('button')

// constraints
const constraints = {
  audio: false,
  video: true
}

const startChat = async () => {
  // Prompt the user for permission, get the stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  // attach to video object
  _video.srcObject = stream

}
btn.addEventListener('click', startChat)