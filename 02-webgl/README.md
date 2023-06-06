# Interactive 3D and 2D graphics

## What is WebGL?



## What is ThreeJS?


### Getting Started
First, create a new directory called `simple-threejs-project`
```bash
$ mkdir simple-threejs-project
```

Change into the directory and run `git init` and `npm init`, respectively.
```bash
$ cd simple-threejs-project
```
The structure of your project folder should look like the following:
```
simple-threejs-project
├── css
    └── style.css
├── js
    └── main.js
└── index.html
```
### Create an HTML Structure


```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Simple ThreeJS Project</title>
 <style>
   body { margin: 0; background: lemonchiffon;}
 </style>
 <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
 <script type="importmap">
   {
     "imports": {
       "three": "https://unpkg.com/three@v0.152.0/build/three.module.js",
       "three/addons/": "https://unpkg.com/three@v0.152.0/examples/jsm/"
     }
   }
 </script>

</head>
<body>
  <div id="container"></div>
  <script type="module" src="./script.js"></script>
</body>
</html>
```

To be able to run the Three.js code, you'll need to link the Three.js library. Just use the CDN for now. And, as you're just experimenting and learning right now, you don't really need to go through the trouble of setting up a bundler / transpiler. Set your script tag as "module" and import threejs.module.js from either a CDN or a local download:

```js
import * as THREE from 'three';
```

Build a Simple Scene

Every scene needs three elements:
1. Scene
2. Camera
3. Renderer

```js
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// select the canvas element from the index.html file
const canvas = document.querySelector('#container');
// renderer
const renderer = new THREE.WebGLRenderer();

renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.render(scene, camera);
```
