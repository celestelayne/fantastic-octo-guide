console.log('this is the desktop client')

const socket = io();

const circle = document.querySelector('.circle');
const user = document.querySelector('.user')

// listening for connection on server
socket.on('connect', () => {
  // see this line in the browser console
  console.log(`Desktop user connected on: ${socket.id}`)

  // construct the URL
  let url = `${new URL(`/controller-client.html?id=${socket.id}`, window.location)}`;
  
  console.log('url link here: ', url)

  // append URL to footer
  user.textContent = url
  user.setAttribute('href', url);

  // add QR code to the footer
  const typeNumber = 4;
  const errorCorrectionLevel = 'L';
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(url);
  qr.make();
  document.getElementById('qr').innerHTML = qr.createImgTag();
})

socket.on('update', data => {
  console.log('desktop client: ', data)

  circle.style.left = `${data.x * window.innerWidth}px`;
  circle.style.top = `${data.y * window.innerHeight}px`;
})

