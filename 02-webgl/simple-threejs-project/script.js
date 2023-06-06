console.log('this file is loaded')

import * as THREE from 'three';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 
  75, // field of view
  window.innerWidth / window.innerHeight, 
  0.1, // near clipping plane
  1000 // far clipping plane
);

// select the container element from the index.html file
const canvas = document.querySelector('#container');

// renderer
const renderer = new THREE.WebGLRenderer();

renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );

console.log(renderer.domElement)

document.body.appendChild( renderer.domElement );

// make canvas responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

renderer.render(scene, camera);