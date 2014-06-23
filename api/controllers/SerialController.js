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
      var socketId = sails.sockets.id(req.socket);

      if (!sails.serial_connected) {
        sails.sp.open(function() {
          console.log(" CONTROLLER OPEN ")

          sails.sp.flush(function(err, resp) {
            if (!err) {
              sails.serial_connected = true;
            }
            res.json({ err: err, resp: resp})
          });

        })
      }
      else {
        res.json({ err: 'already connected'})
      }
    },

    close: function(req, res) {
    	if (sails.serial_connected) {
	    	sails.serialport.close(function(r) {
	    		console.log(r);
	    	})
    	}
    },

    write: function(req, res) {
      console.log(req.params);
      if (sails.serial_connected) {
        sails.sp.write('g', function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
          res.json({err: err, results: results})

        });
      }
      else {
        res.json({ err: "not connected."})
      }

    },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SerialController)
   */
  _config: {}

  
};
