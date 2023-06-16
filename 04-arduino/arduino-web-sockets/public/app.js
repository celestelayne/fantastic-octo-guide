console.log('this works')

const leftBulb = document.querySelector('#left-bulb');
const centerBulb = document.querySelector('#center-bulb');
const rightBulb = document.querySelector('#right-bulb');

const btns = document.querySelectorAll('.power');

let socket;

const init = () => {
  socket = io.connect(`/`)
  socket.on(`connect`, () => {
    console.log(`Client connected on: ${socket.id}`)
  })  

  btns.forEach(btn => {
    btn.addEventListener('click', event => {
      let text = event.target.textContent
      if(text === 'Turn On'){
        event.target.textContent = 'Turn Off'
        // write turn on logic
        console.log(event.target.parentElement)
      } else {
        event.target.textContent = 'Turn On'
        // write turn off logic
      }
      
    })
  })
}
init()
