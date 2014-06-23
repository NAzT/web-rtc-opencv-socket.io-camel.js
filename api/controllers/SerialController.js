/**
 * SerialController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
    connect: function(req, res) {
    	sails.serial_connected = true;
        var socketId = sails.sockets.id(req.socket);



    },

    close: function(req, res) {
    	sails.serialport.close(function(r) {
    		console.log(r);
    	})
    },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SerialController)
   */
  _config: {}

  
};
