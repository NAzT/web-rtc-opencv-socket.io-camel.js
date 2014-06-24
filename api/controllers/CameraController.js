/**
 * CameraController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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



   use: function(req, res) {
      var socketId = sails.sockets.id(req.socket);
      if (!sails.using_camera) {
	      sails.using_camera = socketId;
	      console.log("lock the camera")
	      res.json( { result: 'ok', err: null })
      }
      else {
	      console.log("camera is LOCKED");
	      res.json( {  result: null, err: 'camera is LOCKED.'})
      }
   },

   is_using: function(req, res) {
		res.json({result: !!sails.using_camera})
   },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CameraController)
   */
  _config: {}


};
