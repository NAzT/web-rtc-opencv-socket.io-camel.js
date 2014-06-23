var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/tty.usbserial-A9A9XBJB", {
  //parser: serialport.parsers.raw,
	baudrate: 115200,
  stopBits: 1,
  parity: 'none',
  dataBits: 8,
  flowControl: false,
}, false);


sp.on("open", function() {
	console.log("OPEN");
});

sp.on("data", function(data) {
	console.log("DATA", data);
});


sp.open(function () {
  console.log('open');
	//sp.write(new Buffer(0x82), function(err, result) { 
	sp.write(new Buffer(0x82), function(err, result) { 
		console.log(err, result);
	});
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
});
