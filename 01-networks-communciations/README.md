# Networks and Communications

## Servers

### Setting Up a Local HTTP Server

An HTTP server can be useful for testing web applications locally during development and for sharing files across multiple devices connected on the same network, like a mobile phone or tablet.

First, check to see if you have python installed on your computer and if so, which version. Open your command prompt (Windows) or terminal (macOS/Linux). To check if Python is installed, enter one of the following commands:
```bash
$ python --version
# If the above fails, try:
$ python3 --version
```
The command above should return a version number, such as:
```bash
$ Python 2.7.16
``` 
If you do not have Python installed on your system, you will need to download it here. After installing, close your current Command Prompt Window and open a new one. 

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
const http = require("http");

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
    res.writeHead(200); # sets the HTTP status code of the response
    res.end("My first server!"); # writes the HTTP response back to the client who requested it
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

![add image here]()

#### 🟩 Challenge: Return different Kinds of Content [JSON, CSV, HTML]

Technically we can just drop some HTML in the `res.end()` method which writes the HTTP response back to the client that requested it (in this case its the web browser). This function will return any data the server has to return. In this case, its text data (with an HTML format).

The response we return from a web server can take a variety of media types – text, images, application, audio, video and multipart. This example will focus on returning text-based formats and in order to do that we need to:
Set the Content-Type header in our HTTP responses with the appropriate value.
Ensure that `res.end()` gets the data in the right format. 

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

Next, import the fs module:
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

![add image here]()

You have now returned an HTML page from the server to the user. 

### Setting up an Express web server

## Web Sockets

### Get real-time data


### Build a chat app

## Web Real-Time Communication (WebRTC)


## User Datagram Protocol (UDP)