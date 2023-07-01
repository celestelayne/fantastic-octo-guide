console.log('this file is loaded')

import * as THREE from 'three';
// addons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
camera.position.set(0,0,10)
camera.lookAt(scene.position);

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
  ===== GEOMETRY -> CUBE
*/
const cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
// create a material
const cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x8F6D2E } );
// create mesh with geometry and material
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
// set position and rotation
cube.position.set(-4, 3, 0);
cube.rotation.set((15/180) * Math.PI, 0, 0)
// pass cube mesh to the scene
scene.add(cube)


/*
  ===== GEOMETRY -> BALL
*/
const ballGeometry = new THREE.SphereGeometry( 1.5, 32, 32 );
// create a material
const ballMaterial = new THREE.MeshLambertMaterial( { color: 0x8F6D2E } );
// create mesh with geometry and material
const ball = new THREE.Mesh( ballGeometry, ballMaterial );
// set position
cube.position.set(-4, 3, 0);
// pass ball mesh to the scene
scene.add(ball)

/*
  ===== LIGHTING
*/
const ambientLight = new THREE.AmbientLight("white", 0.6)
scene.add(ambientLight)

const directLight = new THREE.DirectionalLight("white", 1)
directLight.position.set(10, 10, 0)
scene.add(directLight)

// orbit controls --> zoom in/out with scroll, pan with right-click, and drag to orbit
const controls = new OrbitControls( camera, renderer.domElement );

function update() {
  // call the update() function every frame - creates a loop
  requestAnimationFrame(update);

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0

  // render the updated scene and camera
  renderer.render(scene, camera)
}

// call the update() function
update();