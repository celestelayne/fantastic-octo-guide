console.log('this works');

import * as THREE from 'three';

// get a reference to the container that will hold the scene
const container = document.querySelector('.scene-container');

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
    ===== OBJECT LOADER
*/
// loader for loading a JSON resource 
const loader = new THREE.ObjectLoader();

loader.load(
    // resource URL
	"assets/context.json",

    // onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
        console.log(obj)
        scene.add(mesh);
	},
    	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
)
