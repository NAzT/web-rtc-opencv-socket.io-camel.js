/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
	sails.cv = require('opencv');
  var serialport = require("serialport")
  var SerialPort = serialport.SerialPort;
  var sp = new SerialPort("/dev/tty.usbserial-A9A9XBJB", {
        baudRate : 9600,
        dataBits : 8,
        parity : 'none',
        stopBits: 1,
        flowControl : false,
	      parser: serialport.parsers.readline("\r\n") 
	 }, false);

	// sails.serialPort = serialPort;
  sp.on('open', function() {
    console.log("OPEN IN BOOTSTRAP")

    sp.on('data', function(data) {
      console.log('data received: ' + data);
    });


  });

  sails.sp = sp;
  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  // sails.io.sockets.on('frame', function(res) {
  // 	console.log("onFrame", res);
  // })

  cb();
};
