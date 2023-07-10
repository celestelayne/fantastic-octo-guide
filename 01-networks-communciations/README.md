# Networks and Communications

## Servers

### What is a server?

When you visit websites on the internet, they are each hosted by a "server". A server is a computer located somewhere in the world that's connected to the internet, and that computer's job is to "serve" webpages to internet users that want to view them.

### What does it mean to program a server?

We need to write the code that handles website requests and figures out how to respond (by serving the webpages). It might need to format data into JSON, it might need to talk to a database to request a specific resource, and it might need to check if a user is authorized to see the resource they have requested.

To write server side code, is to lay out all of the possible requests that might come in and give instructions for how to handle each type of request.

### Setting Up a Local HTTP Server

**Learning Objective:** Spinning up a test server in the Terminal

An HTTP server can be useful for testing web applications locally during development and for sharing files across multiple devices connected on the same network, like a mobile phone or tablet.

First, check to see if you have python installed on your computer and if so, which version. Open your Command Prompt (Windows) or Terminal (macOS/Linux). To check if Python is installed, enter one of the following commands:

```bash
$ python --version
# If the above fails, try:
$ python3 --version
```
The command above should return a version number, such as:
```bash
$ Python 2.7.16
``` 
If you do not have Python installed on your system, you will need to [download it here](https://www.python.org/downloads/). After installing, close your current Command Prompt Window and open a new one. 

Navigate into your project directory:
```bash
$ cd networks
``` 
If you are running version 2 (i.e Python 2.x.x) type the following command and then hit enter:
```bash
$ python -m SimpleHTTPServer
```
If you are running version 3 (i.e. Python 3.x.x) type the following command and then hit enter:
```bash
$ python -m http.server # on Windows you may have to use python instead of python3
$ python3 -m http.server # on Mac you may need to use python3
 ```
You should see the following output from the Terminal window:
```bash
Serving HTTP on 0.0.0.0 port 8000 ...
```
You can run a python http server on any port, the default port is 8000. To run it on a different port, just modify the command:
```bash
$ python -m SimpleHTTPServer 8080
```
Open a browser window and type in the URL:
```bash
http://localhost:8080/
```
Python SimpleHTTPServer supports only two HTTP methods - GET and HEAD. So it’s a good tool to share files with people who are in the same network. To do this, you need your IP address. You can get this information by opening a new Terminal window and typing the following command:
```bash
$ ipconfig getifaddr en0
```
This format `ipconfig getifaddr <interface name>` means:
* `ipconfig` means internet protocol configuration
* `getifaddr` means get interface addresses
* `en0` represents the wifi interface

You should see the following output from the Terminal window:
```bash
$ 192.168.1.153
```
On a MacOS, you can also find your computer’s IP address by pressing the ​option key and clicking on the wifi icon

Now that you know the ip address of your machine, replace localhost with your ip address and then share it with your friend.
```bash
http://192.168.1.153:8080/
```
Note that if there is any index.html file then it will be served to the browser, otherwise directory listing will be shown as in above image.

To stop the server, type control-C.

<details>

  <summary>🏆 Challenge:</summary>

  <h3>Draw a diagram of the request response cycle with the server and a client of your choosing included and labeled.</h3>

</details>

***

### Setting up an HTTP web server
Open a Terminal window and create a new folder, then navigate to the newly created folder:
```bash
$ mkdir simple-http-server
```
Change into the directory:
```
$ cd simple-http-server
```
Create a server.js file:
```
$ touch server.js
```
Open the file in your text editor.

Load the http module, it has a function to create a server.
```
const http = require("http");
```
Define two constants
```js
const host = 'localhost';
const port = 8000;
```

The value localhost is a special private address that computers use to refer to themselves. It’s typically the equivalent of the internal IP address 127.0.0.1 and it’s only available to the local computer.

The port is a number that servers use as an endpoint or “door” to our IP address. In our example, we will use port 8000 for our web server. 

When we bind our server to this host and port, we will be able to reach our server by visiting http://localhost:8000 in a local browser.

Next, we create a function to handle an incoming HTTP request and return an HTTP response. This function must have two arguments, a request object and a response object

```js
const requestListener = function (req, res) {
    res.writeHead(200); // sets the HTTP status code of the response
    res.end("My first server!"); // writes the HTTP response back to the client who requested it
};
```
Finally, we create our server:
```js
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
```
Let’s now run the server we’ve just created:
```bash
$ node server.js
```
In the console, we will see the following output:
```bash
Server is running on http://localhost:8000
```
Now, open the web browser with the URL and you should see:

![add image here]('../../../assets/01_images/simple_http_server_03.png)

<details>
 <summary>🏆 Challenge:</summary>

  <h3>You are able to return different Kinds of Content – JSON, CSV, HTML. For this challenge, let's return some JSON (JavaScript Object Notation) to the webpage.</h3>

  <code>

    const data = [{
      "name": "celeste",
      "city": "new york"
    }]

    res.end(JSON.stringify(data))
  </code>

  <p>You should see the following:</p>
  <img src="../assets/01_images/simple_http_server_02.png">
</details>


Technically we can just drop some HTML in the `res.end()` method which writes the HTTP response back to the client that requested it (in this case its the web browser). This function will return any data the server has to return. In this case, its text data (with an HTML format).

The response we return from a web server can take a variety of media types – text, images, application, audio, video and multipart. This example will focus on returning text-based formats and in order to do that we need to:

* Set the Content-Type header in our HTTP responses with the appropriate value.
* Ensure that `res.end()` gets the data in the right format. 

Let’s start by modifying the `requestListener()` function to return the appropriate Content-Type header. Remember, `setHeader()` takes two arguments, name and value:
```js
res.setHeader('Content-Type', 'text/html')
```
Then set the HTTP status code of the response.
```js
res.writeHead(200);
```
To serve HTML files, we load the HTML file with the fs module and use its data when writing our HTTP response. Create an HTML file with minimal content. 
```html
<!DOCTYPE html>
<html lang="en">
<head>
 <title>Document</title>
 <style>
   body {
     background: lemonchiffon;
   }
 </style>
</head>
<body>
 <div>
   <h1>Simple HTTP Server</h1>
   <p>Computational Design Workflows</p>
 </div>
</body>
</html>
```

Next, import the `fs` module:
```js
const http = require("http");
const fs = require('fs').promises;
```
The fs module contains a readFile() function that we’ll use to load the HTML file. `readFile()` takes one argument:
```js
fs.readFile(__dirname + "/index.html")
```
The special variable __dirname has the absolute path of where the Node.js code is being run. Then, we append the HTML file we want rendered. If the `readFile()` promise successfully resolves, it will return data which we have named, content – the HTML file data. Use `.then()` method to handle the successfully resolved data.

Inside the `.then()` method,set the Content-Type header, write the status code to indicate success and send the client (web browser) the HTML page we served it up.
```js
const requestListener = (req, res) => {
 fs.readFile(__dirname + "/index.html")
 .then(content => {
   res.setHeader("Content-Type", "text/html")
   res.writeHead(200)
   res.end(content)
 })
}
```
In case the `fs.readFile()` method fails, we use the `catch()` method to handle the rejection. The `catch()` method accepts the error that `fs.readFile()` returns. Set the status code to 500 signifying that an internal error was encountered, and returns the error to the user.
```js
 .catch(err => {
   res.writeHead(500)
   res.end(err)
   return
 })
```
Open the web browser to http://localhost:8000. 

![add image here]('../../../assets/01_images/simple_http_server_01.png)

You have now returned an HTML page from the server to the user. 

***

### Setting up an Express web server

Learning Objective: Spinning up a web server using the Express JavaScript framework

#### Directory and File Setup

Open a Terminal window and create a new folder, then navigate to the newly created folder:
```bash
$ mkdir simple-express-server
```
Change into the directory and run npm init. npm – or "Node Package Manager" – is the default package manager for JavaScript's runtime Node.js. NPM consists of two main parts:
* The Command Line Interface, and
* The online repository of libraries (JavaScript packages)

For more detailed information about npm, [read this article](https://www.freecodecamp.org/news/what-is-npm-a-node-package-manager-tutorial-for-beginners/).

```bash
$ cd simple-express-server

$ npm init -y # create package.json for the project
```
> Note: The first command initializes an empty Git repository and the second walks you through creating a package.json file. The structure of the backend directory should now look like this:

```md
simple-express-server
├── package.json
└── .git
```

Install the `express` package:
```bash
$ npm install express
```
Node Package Manager (npm) keeps track of the various libraries and third-party packages of code used in a Node project. `npm install express` tells the Node Package Manager (npm) to download and install the Express library for this project to use. The above two npm commands will be necessary for every new web application that uses Express. 

Notice that a new folder called `node_modules` was created. Open it up and you'll see that there is an express folder. `node_modules` is where the dependencies in `package.json` are downloaded to. If you look at `package.json` again, you'll see express has been added as a dependency for this project.

Open the project directory in VS Code:
```
$ code .
``` 

### Server Setup

Now that Express is installed, create a server.js file:
```bash
$ touch server.js
```

Add boilerplate code found [here](https://expressjs.com/en/starter/hello-world.html):
```js
// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
// establish which port you’d like to use
const port = 3000

// define route handler for GET requests to the server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
In the Terminal, run `node server.js`:
```
$ node server.js
``` 
You should see: Example app listening on 3000. When using Express, our server-side console logs show up in the Terminal window. Now visit http://localhost:3000/ in your browser window and you should see "Hello World!".

> Note:  Every time you make a change in your server code and want it to run, you need to end the previous server and run node server.js.

Let’s test this by placing a console.log() with the req and res parameters inside the app.get() method for the `/` path. (The / path is often called the "root" path.) Restart the server and briefly check out what the req and res parameters return to the Terminal.

```js
app.get('/', (req, res) => {
  console.log(req, res)
  res.send('Hello World!')
})
```
#### Routes

Once the web server is listening, it can respond to requests. Routes are how a server side application responds to the client request of a particular HTTP endpoint. An HTTP endpoint is a URL in the web application, examples include:

```bash
https://localhost:8000/fruits
```
Let's look at the anatomy of the above URL:
* https is the protocol
* localhost is the hostname 
* 8000 is the port
* `/fruits` is the path

Express uses the `app.get()` method to register routes to match GET requests. `app.get()` takes two parameters:
* The first parameter is the route (or path). In this case, it’s the site root /.
* The second parameter is a callback function to handle the request and send a response
  * The callback function takes two parameters: request and response.

Let’s build two more routes into our application:

| Request Type  | Request Path  | Response  |
| ------------- |:------------- | :-----    |
| GET           | /             | Hello World     |
| GET           | /fruits       | apples, bananas, oranges     |
| GET           | /animals      | cats, birds, zebra     |

When the server receives a GET request at `/`, we will use a route to define the appropriate functionality and path. The path is the part after the hostname and port number. GET requests are used for retrieving resources from a server.

In the server lets set up a couple dummy datasets (sometimes called seed data) and serve them when you hit the url, `/fruits` and `/animals` in the web browser. To have this seed data be accessible, we need to set up a route to serve it.


```js
// dummy dataset
const fruits = ['apples', 'bananas', 'oranges']
const animals = ['cats', 'birds', 'zebra']

// routes
app.get('/, (req, res) => {
  res.send('Hello World!')
  res.send("<h1>Welcome to the chat app</h1>")
})

app.get('/fruits, (req, res) => {
  // send all the fruit
  res.json(fruits)
})

app.get('/animals, (req, res) => {
  // send all the animals
  res.json(animals)
})
```
Add an `app.get()` method for the path `/fruits`. Inside the new route, use `res.json(fruits)` to respond with some JSON containing all the fruit from our fruits variable. Do the same for the `/animals` route.

> Restart the server and you should see the fruit when hit http://localhost:3000/fruits


<details>

  <summary>🏆 Challenge:</summary>

  <h3> Load an HTML page on the root route called `index.html`. Then, add a second route called `/about` and load a separate HTML called `about.html`. The `about.html` page should include a short bio about yourself.</h3>

  <code>

    app.get('/about', (req, res) => {
      res.send('My name is Celeste')
    })
  </code>

</details>

***

## Web Sockets

### Get real-time data
Getting real-time data with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) vs [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

Create the WebSocket connection:
```js
const webSocketUrl = `wss://ws.bitstamp.net`;
const socket = new WebSocket(<url goes here>);
```
Detect a connection
The open event is fired when a connection with a WebSocket is detected:
```js
socket.addEventListener("open", (event) => {
  socket.send(`Socket open`);
});
```
Inside the callback function, wrap the subscription message in an object and send it over the socket connection:
```js
socket.addEventListener("open", (event) => {
  const data = {
	event: "bts:subscribe",
	data: {
	  channel: "live_trades_btcusd"
}
  } 
  socket.send(JSON.stringify(data));
});
```
The `WebSocket.send()` method queues up the data to be transmitted to the server over the WebSocket connection.

Listen for incoming data
The message event is fired when data is received through a WebSocket.
```js
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
```

### Build a chat app

Create a new project folder and navigate to this newly created folder:
```bash
$ mkdir chat-app && cd chat-app
```
Create a `package.json` for the application and install Express:
```js
// create package.json for the project
$ npm init -y
// install the express module
$ npm install express

$ touch server.js
```

Create a `server.js` file in the root folder:
```js
const http = require("http")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the chat app</h1>")
})

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log("Server working on port ${PORT}")
})
```
Add a start script to the `package.json` that executes the `server.js` file:
```js
"scripts": {
  "start": "node server.js"
},
```
Now, in the Terminal, run `npm start` to launch the Node application. Navigate to `http://localhost:8000`

#### Serving HTML
Currently, we are just passing in a string of HTML to the `res.send()` method. Let’s send an HTML file.

Create an `index.html` file that includes a form and an element to append the text to the webpage. 

#### Listening for websocket connections

#### Create a socket.io connection on the client

### Name the chat participants

### Build a shared cursor app [collaborative editing]

#### 🏆 Challenge: Build a collaborative sketching application

## Web Real-Time Communication (WebRTC)

WebRTC is different from WebSockets in that once a connection is established, data can (under some circumstances) be transmitted directly between browsers and devices in real time without touching the server.

### Simple Video Media Stream

Learning Objective: 

### What are we building?

Our first WebRTC-enabled project will show a single `<video>` element on the webpage, when the user clicks the start button the browser will ask the user for permission to use the camera, and then show a live feed of the user in the browser.

<screenshot>

Create a new project, with a simple Express server, a static public folder and a `server.js` file:

```bash
$ mkdir simple-webrtc-webcam
$ cd simple-webrtc-webcam
$ mkdir public
$ touch server.js
```
Change into the directory and run git init and yarn init, respectively.

```bash
$ git init # initialize empty git repository
$ yarn init -y # create package.json for the project
```
> Note: The first command initializes an empty Git repository and the second walks you through creating a package.json file. 

Install the `express` package:
```bash
$ npm install express
```
Notice that a new folder called node_modules was created. Open it up and you'll see that there is an express folder. node_modules is where the dependencies in package.json are downloaded to. If you look at package.json again, you'll see express has been added as a dependency for this project.

The structure of the backend directory should now look like this:
```md
simple-webrtc-webcam
├── node_modules/
    └── express/
├── public/
├── package.json
├── server.js
└── .git
```
### Server Setup

Write some boilerplate code for a simple server. Remember to require express, call the express function to create a server, and tell the server to start listening.
```js
// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
// establish which port you’d like to use
const PORT = 3000
// middleware
app.use(express.static('public'))
// define route handler for GET requests to the server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
```
Finally, start the server:
```bash
$ nodemon server.js 
```
Inside of the `public` folder, you'll create an `index.html` and a `<video>` tag.

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <title>Document</title>
</head>
<body>
  <video id="video" autoplay playsinline></video>
  <button id="button">Start</button>
</body>
</html>
```
In the `app.js` file, we will be using the `getUserMedia()` method. It prompts the user for permission to use a media input.

```js
const _video = document.getElementById('video')

const constraints = {
 audio: false,
 video: true
}

const startChat = async() => {
   const stream = await navigator.mediaDevices.getUserMedia(constraints);
 // attach to video object
 _video.srcObject = stream
}
```
Add a button that triggers the webcam

```js
const btn = document.getElementById('button')
btn.addEventListener('click', startChat);
```

### Peer to peer media streaming
