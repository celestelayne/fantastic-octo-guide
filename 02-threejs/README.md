# Interactive 3D graphics

## What is ThreeJS?

#### What are we building?

![](../assets/02_images/sphere_cube_01.gif)

### Getting Started
Unzip the project in Google Drive called, [simple-threejs-starter](). The basic structure of every ThreeJS project needs at least one HTML file to define the webpage and a JavaScript file to run the `three.js` code. 

Your project folder should look like the following:
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

Inside the `index.html` file, place a div element that has a class called `scene-container`. Connect the corresponding `styles.css` and `main.js` files:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Basic ThreeJS Project</title>
</head>
<body>
  <div id="scene-container"></div>
</body>
</html>
```
### Include Three in the App 

To be able to run the Three.js code, you'll need to link the [Three.js library](https://threejs.org/docs/#manual/en/introduction/Installation). For now, we are going to use something called a CDN, content delivery network. And, as you're just experimenting and learning right now, you don't really need to go through the trouble of setting up a bundler / transpiler. 

In the `index.html` file, set your script tag type as "module" and place it just before the closing body tag. 

Then, add the following scripts in between the `<head></head>` tags:
* Add an import map defining where to get the package
* Because import maps are not yet supported by some major browsers, we include the polyfill `es-module-shims.js`

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
    <script type="module" src="./main.js"></script>
  </body>
```

In the `main.js` file, import the three.js core library; however, web browsers don't know what that means. So, in the `index.html` we'll need to add an [import map]() defining where to get the package.

```js
import * as THREE from 'three';
```

In the `styles.css` file we will add some basic styling that will remove the default margins and scrollbars, make the scene-container full page and set its background color to the same as the scene’s background color to prevent flashing on load:
```css
 body {
  margin: 0;
  overflow: hidden;
 }

 #scene-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #233143;
 }
```
In most browsers, the body element has a default margin of 8 pixels which creates a white gap on the perimeter of the screen. So we set the margin to zero to override this style.

Finally, we need to [run a Local HTTP Server](../01-networks-communciations/README.md) to host these files at a URL where the web browser can access them. While it's technically possible to double-click an HTML file and open it in your browser, important features that we'll later do not work when the page is opened this way, for security reasons.

```bash
$ python3 -m http.server 3000
```

Open a browser window and type in the URL:
```bash
http://localhost:3000/
```
You should see a blank page with a background color, `#233143`.

### Project Setup

Every Three.js project has three elements that form the basic scaffolding of the application:

1. Scene – where we place all of our rendered objects, lights and cameras
2. Camera – allows us to see objects in the scene
3. Renderer – renders our scene with the WebGL API

The `main.js` file is the entry point for the project. This is where we define the scene, set up the camera and render the scene into the browser.

#### Define the Scene

![]()

Query the scene container element located in the `index.html` file: 
```js
import * as THREE from 'three';
// get a reference to the container element that will hold the scene
const container = document.querySelector("#scene-container"); 
```
The renderer will automatically create a `<canvas>` element which will be inserted between the opening and closing container divs. Recall, we are making the scene container the full width and height of the webpage using CSS.

Define the scene where we place objects and lighting. While setting the background color is optional with a default of black, setting it to the same color of the `scene-container` will prevent flicker at reload:

```js
// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x233143);
```

#### Set Up the Camera

![]()

_Moving the camera away from the center allows us to see the objects placed in the center of the scene._

Create a camera that will define how we look at the scene. There are two options:
* Perspective cameras
* Orthographic cameras

Video games mostly use perspective cameras, so things that are far away appear smaller. With orthographic cameras objects will have the same size regardless of distance from the camera. For both cameras, we have to define a view frustum. 

A frustum is a mathematical term meaning a four-sided rectangular pyramid with the top cut off. In this context, the frustum is the region in the 3D space that is going to be projected to the screen. Things outside the frustum will not appear on screen.

![]()

For this project we will be using the `PerspectiveCamera`. The [`PerspectiveCamera()`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) method takes four parameters:
1. Field of View (FOV): a number (in degrees) that represents the amount (width) of the observable virtual world that you can see at one point 
2. Aspect Ratio: ratio between the width and height of the scene (width divided by height). Here we are using the `.innerWidth` and `.innerHeight` properties of the window object
3. Near Clipping Pane: the boundary plane closest to the camera, anything closer to the camera will not be rendered
4. Far Clipping Pane: the boundary plane farthest from the camera, anything beyond this pane will not be rendered

At this point, let’s set up some global variables for the project:

```js
const WIDTH = container.innerWidth
const HEIGHT = container.innerHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

// camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
```

The four parameters passed into the `PerspectiveCamera()` define the frustum. Finally, we position and point the camera to the center of the scene:

```js
camera.position.set(-30,40,30)
camera.lookAt(scene.position);
```
![]()

_Moving the light gives us a better view._

#### Set Up the Renderer

Finally, we draw or render the scene into the `<canvas>` element.
```js
// renderer
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );
```
Last but not lease, render the scene:
```js
// renderer
renderer.render( scene, camera )
```
In this one line, we tell the renderer to create an image of the scene using the camera and output the image to the canvas element.



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
