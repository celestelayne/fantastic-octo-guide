# Interactive 3D graphics

## What is ThreeJS?

#### What are we building?

![](../assets/02_images/sphere_cube_01.gif)

### Getting Started
First, unzip the project in Google Drive called, `simple-threejs-project`. Alternatively, you can create this project from scratch by running the following commands:

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
1. Scene – where we place all of our rendered objects, lights and cameras
2. Camera – allows us to see objects in the scene
3. Renderer – renders our scene with the WebGL API

```js
// get a reference to the container that will hold the scene
const canvas = document.querySelector('#container');

// create the scene
const scene = new THREE.Scene();
// create a camera
const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000

const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

// create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );

// add the automatically created <canvas> element to the page
document.body.appendChild( renderer.domElement );
// rendeer the scene
renderer.render(scene, camera);
```
![field of view image here]()

The [`PerspectiveCamera()`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) method takes four parameters:
1. Field of View (FOV): a number (in degrees) that represents the amount (width) of the observable virtual world that you can see at one point 
2. Aspect Ratio: ratio between the width and height of the scene (width divided by height). Here we are using the `.innerWidth` and `.innerHeight` properties of the window object
3. Near Clipping Pane: the boundary plane closest to the camera, anything closer to the camera will not be rendered
4. Far Clipping Pane: the boundary plane farthest from the camera, anything beyond this pane will not be rendered

### Create Visible Objects

[Meshes]() are the most common kind of visible object used in 3D computer graphics, and are used to display all kinds of 3D objects. Meshes take two parameters: a geometry and a material.

The geometry defines the shape of the mesh while the material defines how the surface of the mesh looks. If we create a box-shaped geometry then the mesh will be shaped like a box.

```js
// create a geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// create a material
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// create mesh and pass in geometry and material
const cube = new THREE.Mesh( geometry, material );
// add the object to the scene
scene.add( cube );
```
Here, we’ve created a cube using `BoxGeometry()` which takes three parameters: width, height, and depth. Materials define the surface of the object – what it looks like its made from. Here, we will create a `MeshBasicMaterial()`, A material for drawing geometries in a simple shaded (flat or wireframe) way.

Now, we can create the mesh passing in both parameters.

Finally, we pass the mesh to the scene. Don’t see anything? That is because Every object we create is initially positioned at the center of our scene, the point (0,0,0). This means our camera is currently positioned at (0,0,0), and any objects we add to the scene will also be positioned at (0,0,0), all jumbled together on top of each other. So, let’s move it towards the viewer:

```js
camera.position.set(0, 0, 10);
```
#### 🟩 Challenge: 

### Lighting

### Animation
