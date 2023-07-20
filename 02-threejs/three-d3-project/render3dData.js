console.log('script.js linked')

// import the THREE library
import * as THREE from 'three'
// import orbit controls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

//==== set global variables
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

//==== create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x233143);

//==== camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(0,0,10)
camera.lookAt(scene.position);

//==== renderer
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

//==== D3

async function getJsonData() {
  // import JSON data
	const data = await d3.json("./data.json");
  console.log(data)
}
getJsonData();


async function getCsvData() {
  // import CSV data
	const data = await d3.csv("./amsterdam_weekdays.csv");
  // iterate over array of objects
  data.forEach(function(d) {
    d["room_type"] = +d["room_type"];
    console.log(d)
  })
  console.log(data[0]);
}
getCsvData();

// render the updated scene and camera
renderer.render(scene, camera)