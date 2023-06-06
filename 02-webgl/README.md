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
The basic structure of every ThreeJS project needs at least one HTML file to define the webpage and a JavaScript file to run the three.js code. Your project folder should look like the following:
```md
simple-threejs-project
├── public/
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
  <title>Basic ThreeJS Project</title>
</head>
<body>
  <div id="container"></div>
</body>
</html>
```
### Include Three in the App 

To be able to run the Three.js code, you'll need to link the Three.js library. Just use the CDN for now. And, as you're just experimenting and learning right now, you don't really need to go through the trouble of setting up a bundler / transpiler. In the `index.html` file, set your script tag type as "module" and place it just before the closing body tag. Then, add the following scritps in between the `<head></head>` tags:
* Add an import map defining where to get the package
* Because import maps are not yet supported by some major browsers, we include the polyfill es-module-shims.js

```html
  <head>
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
    ...
    <script type="module" src="./script.js"></script>
  </body>
```
In the `script.js` file, import the three.js core library:
```js
import * as THREE from 'three';
```

### Build a Simple Scene

Every project needs three elements:
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
