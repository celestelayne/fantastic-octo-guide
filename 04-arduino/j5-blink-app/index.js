// Require your Transport!
const Serialport = require("serialport").SerialPort;
// Get the Firmata class 
const Firmata = require("firmata-io").Firmata;

const { Board, Led } = require('johnny-five')

Serialport.list().then(ports => {

  // Figure which port to use...
  const port = ports.find(port => {
    console.log(port)
    return port.manufacturer && port.manufacturer.startsWith("Arduino")
  });

  // Instantiate an instance of your Transport class
  const transport = new Serialport({
    path: port.path,
    baudRate: 57600 // what is a good baud rate?
  });

  const board = new Board({
    io: new Firmata(transport)
  });
  
  board.on('ready', () => {
    console.log("Johnny-Five is ready!");
    const led = new Led(11)
    led.blink(500)
  })

  board.on('close', () => {
    // Unplug the board to see this event!
    console.log("Johnny-Five has been disconnected!");
  })
})