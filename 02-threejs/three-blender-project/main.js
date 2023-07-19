console.log('this file is loaded')

import * as THREE from 'three';
// addons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

/*
  ===== GLOBAL VARIABLES
*/
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

/*
  ===== SCENE
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x233143);

/*
  ===== CAMERA
*/
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

// add grid helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

/*
  ===== RENDERER
*/
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

/*
  ===== LOAD glTF FILES
*/
// Instantiate a loader
const loader = new GLTFLoader();
// Load a glTF resource
loader.load('./models/Avocado/Avocado.gltf', function(gltf){
  gltf.scene.scale.set(10, 10, 10)
  scene.add( gltf.scene );
},
// called while loading is progressing
function(xhr){
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function(error){
  console.log( 'An error happened' );
})

// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

/*
  ===== LIGHTING
*/
const ambientLight = new THREE.AmbientLight("white", 0.6)
scene.add(ambientLight)

const directLight = new THREE.DirectionalLight("white", 1)
directLight.position.set(10, 10, 0)
scene.add(directLight)

// orbit controls --> zoom in/out with scroll, pan with right-click, and drag to orbit
// const controls = new OrbitControls( camera, renderer.domElement );

// render the updated scene and camera
// renderer.render(scene, camera)

function animate() {
  requestAnimationFrame( animate );

  renderer.render(scene, camera);
}

animate()