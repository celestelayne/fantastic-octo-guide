console.log('this file is loaded')

import * as THREE from 'three';

// get a reference to the container that will hold the scene
const container = document.querySelector('#container');

// create the scene
const scene = new THREE.Scene();

// create a camera
const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000

const camera = new THREE.PerspectiveCamera( 
  fov,
  aspect, 
  near,
  far
);

// create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );

// create the ground plane
const planeGeometry = new THREE.PlaneGeometry(60, 20);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xAAAAAA
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15, 0, 0);

// add the plane to the scene
scene.add(plane);

// create a geometry
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
// create a material
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// create mesh with geometry and material
const cube = new THREE.Mesh( geometry, material );

    // position the cube
    cube.position.set(-4, 3, 0);
// pass mesh to the scene
scene.add(cube)

camera.position.set(0, 0, 10);
camera.lookAt(scene.position);

// add the automatically created <canvas> element to the page
document.body.appendChild( renderer.domElement );

// render, or 'create a still image', of the scene
renderer.render(scene, camera);