console.log('this works');

// query the scene
const scene = document.querySelector("a-scene");
scene.setAttribute('game-manager', '');
// create a new entity
const cube = document.createElement("a-box");
// set the cube's attributes
cube.setAttribute('color', 'tomato')
cube.setAttribute('height', '2')
cube.setAttribute('depth', '2')
cube.setAttribute('width', '2')
cube.setAttribute("position", "3 1 0");
// append the cube to the scene
scene.appendChild(cube);

let count = 0;
const render = () => {
  count += 0.01
  // console.log(count)
  requestAnimationFrame(render);
  cube.setAttribute('position', `${Math.sin(count * 2) + 1} 3 0`)
} 

render()