'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {
    $scope.project =  { }

    $scope.project['name'] = "Nat's Project"

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	  $socket.on('connectedUsers', function(data) {
				$scope.connectedUsers = data;
	  })

    $scope.$on('$viewContentLoaded', function() {
      var video = document.querySelector('#live');
      var canvas = document.querySelector('#canvas');
      var ctx = canvas.getContext('2d');
      // var processed_canvas = document.querySelector('#processed_canvas');
      // var processed_ctx = processed_canvas.getContext('2d');
      $scope['frame'] = 0;
      $scope.fps = 4;

      $socket.on('face_data', function(d) {
        $scope.src_gray = 'data:image/jpeg;base64,'+d.image_gray;
        $scope.src_hsv = 'data:image/jpeg;base64,'+d.image_hsv;
        // var img = new Image();
        // img.src = $scope.src_image;
      })
   
      var streaming_callback = function(stream) {
        // video.src = webkitURL.createObjectURL(stream);
        video.src = window.URL.createObjectURL(stream); 
      }
      var error_callback = function(err) {
        console.log("Unable to get video stream!")
      }

      navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      navigator.getMedia({ video: true, audio: false }, streaming_callback, error_callback);

      var timer_callback = function() {
        ctx.drawImage(video, 0, 0, 320, 240);
        $scope['frame'] ++;
        $scope.image_data = canvas.toDataURL('image/jpeg');
        $socket.emit('frame', $scope.image_data);
        $scope.$apply();
        // var data = canvas.get()[0].toDataURL('image/jpeg', 1.0);
        // newblob = dataURItoBlob(data);
      }

      $scope.timer = setInterval(timer_callback, 1000/$scope.fps);

    });
  });
