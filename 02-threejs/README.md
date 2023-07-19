# Interactive 3D graphics

## What is ThreeJS?

[ThreeJS Documentation](https://threejs.org/docs/index.html#manual/en/introduction/Installation) is a JavaScript library that tries to make it as easy as possible to get 3D content on a webpage. It uses [WebGL]() in an [HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to render animations that alone are not possible to create with just WebGL. [WebGL (Web Graphics Library)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics to a `<canvas>` element within a compatible web browser without the use of plug-ins.

### What are we building?

![](../assets/02_images/sphere_cube_01.gif)

## Getting Started

Unzip the project in Google Drive called, [simple-threejs-starter](). The basic structure of every ThreeJS project needs at least one HTML file to define the webpage and a JavaScript file to run the `three.js` code. 

Your project folder should look like the following:
```md
simple-threejs-starter
├── style.css
├── main.js
└── index.html
```
The basic flow of a project is to set up the Three.js environment, giving it a `<canvas>` element to draw to. Then you create a scene, add content (camera, lights, models, textures and shaders), and call render(). The result is output to the provided `<canvas>`.

## Create an HTML Structure

Inside the `index.html` file, place a `<div>` element that has a class called `scene-container`:

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

Then, connect the corresponding `styles.css` and `main.js` files:

```html
<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Basic ThreeJS Project</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div id="scene-container"></div>

    <script type="module" src="main.js"></script>
  </body>
</html>
```
In the `index.html` file, set your script tag type as "module" and place it just before the closing body tag. 

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

## Add ThreeJS Library

To be able to run the Three.js code, you'll need to link the [Three.js library](https://threejs.org/docs/#manual/en/introduction/Installation). For now, we are going to use something called a Content Delivery Network (CDN).

Then, add the following scripts in between the `<head></head>` tags:
* Add an [import map]() defining where to get the package
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

In the `main.js` file, import the three.js core library:

```js
import * as THREE from 'three';
```
Now, we have access to a variable named THREE.

## Local HTTP Server

JavaScript has a security feature called the same-origin policy, which means you cannot load externally hosted files inside of your JavaScript code. Since three.js needs to load geometry, textures, and other files you’ll need a local http server so that your files come from the same origin. Simply opening the index.html file directly in the browser isn’t going to work.

Therefore, let's [run a Local HTTP Server](../01-networks-communciations/README.md) in the same directory as the HTML file:

```bash
$ python3 -m http.server 3000
```

Open the local server's URL in your browser:
```bash
http://localhost:3000/
```
You should see a blank page with a background color, `#233143`. Make changes to your HTML file (like changing the background color) and refresh your browser to see the changes.

Inside of our `main.js` file, we now have access to a variable named THREE. If you console.log() this variable, you'll see that there is a lot going on inside:

```js
console.log(THREE)
```
The THREE variable contains most of the classes and properties you might need on a project. 

## Project Setup

Every Three.js project has three elements that form the basic scaffolding of the application:

1. Scene – where we place all of our rendered objects, lights and cameras
2. Camera – allows us to see objects in the scene
3. Renderer – renders our scene with the WebGL API

The `main.js` file is the entry point for the project. This is where we define the scene, set up the camera and render the scene into the browser.

[scene graph]

## Define the Scene

Think of the scene like a tiny universe where all your 3D objects live. The scene defines a coordinate system called World Space which is a 3D Cartesian coordinate system. The very center of the scene is the point (0,0,0), or origin.

![](../assets/02_images/scene_position.png)

To create a scene, use the [Scene]() class:

```js
// create the scene
const scene = new THREE.Scene();
```
Next, query the scene container element in the `index.html` file and set the width and height to that of the browser window.
```js
// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

// global variables
const WIDTH = container.innerWidth
const HEIGHT = container.innerHeight
```

## Set Up the Camera

![](../assets/02_images/camera_position.png)

_Moving the camera away from the center allows us to see the objects placed in the center of the scene._

Think of the camera as a telescope poining at the tiny universe. Creating a camera defines how we look at the universe. There are two options:
* Perspective camera
* Orthographic camera

The perspective camera is the 3D equivalent of a camera in the real world and uses many of the same concepts and terminology, such as the field of view and the aspect ratio. Video games mostly use perspective cameras, so things that are far away appear smaller. With orthographic cameras objects will have the same size regardless of distance from the camera. For both cameras, we have to define a view frustum.

A frustum is a mathematical term meaning a four-sided rectangular pyramid with the top cut off. In this context, the frustum is the region in the 3D space that is going to be projected to the screen. Things outside the frustum will not appear on screen.

![](../assets/02_images/frustrum_position.jpeg)

For this project we will be using the [`PerspectiveCamera()`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) method which takes four parameters:
1. Field of View (FOV): a number (in degrees) that represents the amount (width) of the observable virtual world that you can see at one point 
2. Aspect Ratio: ratio between the width and height of the scene (width divided by height). Here we are using the `.innerWidth` and `.innerHeight` properties of the window object
3. Near Clipping Pane: the boundary plane closest to the camera, anything closer to the camera will not be rendered
4. Far Clipping Pane: the boundary plane farthest from the camera, anything beyond this pane will not be rendered

At this point, let’s set up some global variables for the camera four parameters and pass them into the PerspectiveCamera method:

```js
const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

// camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
```

The four parameters passed into the `PerspectiveCamera()` define the frustum. 

## Set Up the Renderer

Finally, we draw or render the scene into the `<canvas>` element.
```js
// renderer
const renderer = new THREE.WebGLRenderer();
```
In this one line, we tell the renderer to create an image of the scene using the camera and output the image to the canvas element.

Together, the scene, camera, and renderer give us the basic scaffolding of a three.js application. Now you're ready to fill it with objects.

## Define Object

Objects can be many things. You can have primitive geometries, imported models, particles, lights etc. the most common kind of visible object used in 3D computer graphics is the [mesh](). The Mesh takes two parameters:
* Geometry
* Material

The geometry defines the shape of the mesh and the material defines how the surface of the mesh looks.

## Geometry -- Cube

Let's start with a simple `BoxGeometry` and a `MeshBasicMaterial`. To create the geometry, use the BoxGeometry() class and set the width, height, and depth of the box.
```js
// create the geometry
const geometry = new THREE.BoxGeometry( 4, 4, 4 ); 
```
The `MeshBasicMaterial` is the simplest material we can use to describe the appearance of an object. It takes one parameter, an object where we can define its options like texture, color, or opacity.

There are a few ways to specify the color property:
* as a JavaScript hexadecimal 0xff0000
* as a string hexadecimal '#ff0000'
* using color names like 'red'

The following examples uses the JavaScript hexadecimal:
```js
// create the material
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); 
```
Finally, create the Mesh and pass in the geometry and material as parameters: 
```js
// create the mesh
const cube = new THREE.Mesh( geometry, material );
```
Position the mesh within the scene and add the mesh to the scene. We can also set a rotation by each axis.
```js
// set position and rotation
cube.position.set()
cube.rotation.set((15/180) * Math.PI, 0, 0)
// pass mesh to the scene
scene.add(cube)
```
## Geometry -- Sphere

<details>
 <summary>🧩 Challenge: Create a ball mesh using the `SphereGeometry` and `MeshBasicMaterial` methods then, add it to the scene.</summary>

  <code>

    const ballGeometry = new THREE.SphereGeometry( 1.5, 32, 32 );
    // create a material
    const ballMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    // create mesh with geometry and material
    const ball = new THREE.Mesh( ballGeometry, ballMaterial );
    // set position
    cube.position.set(-4, 3, 0);
    // pass ball mesh to the scene
    scene.add(ball)
  </code>

</details>


## Lighting

![]()

_By default, the light points down from above_

A mesh with basic material doesn’t need any light But the Lambert material and Phong material require light. We'll add two lights - an ambient light and a directional light.

AmbientLight is the cheapest way of faking indirect lighting in three.js. It adds a constant amount of light from every direction to every object in the scene. To set an ambient light we set a color and an intensity. 

First update the mesh material to use `MeshLambertMaterial()` since its simplest material that cares about light.

```js
// update the material
const ballMaterial = new THREE.MeshLambertMaterial({color: 0x8F6D2E});
// set the color and intensity of the ambient light
const ambientLight = new THREE.AmbientLight("white", 0.6)
// pass the ambient light to the scene
scene.add(ambientLight)

// set the color and intensity of the directional light
const directLight = new THREE.DirectionalLight("white", 1)
// set the position of the directional light
directLight.position.set(10, 10, 0)
// pass the directional light to the scene
scene.add(directLight)
```

## Orbit Controls

Orbit controls allow us to drag the mouse across the mesh and orbit around it.  It also allows the mousewheel to be used to zoom in and out of the mesh.
```html
<script type="importmap">
  {
    "imports": {
    "three": "https://unpkg.com/three@v0.152.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/browse/three-orbitcontrols@2.110.3/OrbitControls.js",
    "three/addons/": "https://unpkg.com/three@v0.152.0/examples/jsm/"
    }
  }
</script>
```

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

```js
// orbit controls allow us to pan with the mouse
const controls = new OrbitControls( camera, renderer.domElement );
```

```js
function update() {
  // call the update() function every frame - creates a loop
  requestAnimationFrame(update);

  controls.update();

  // render the updated scene and camera
  renderer.render(scene, camera)
}

// call the update() function
update();
```

## Animation

If we want to animate the scene, the first thing that we need to do is find some way to re-render the scene at a specific interval. For this behavior we will use `requestAnimationFrame`, with it we can specify a function that is called at an interval. This interval is defined by the browser.

```js
cube.rotation.set((15/180) * Math.PI, 0, 0)

function update() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0
}
```
