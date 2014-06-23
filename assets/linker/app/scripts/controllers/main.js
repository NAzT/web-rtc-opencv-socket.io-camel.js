'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {
    $scope.project =  { }
    $scope.project['name'] = "Nat's Project"

    $scope.verb = "Waiting"
    $scope.has_data = false;

	  $socket.on('connectedUsers', function(data) {
				$scope.connectedUsers = data;
	  })

    $scope.captureStatus = 'success';

    $scope.$on('$viewContentLoaded', function() {
      $socket.on('face_data', function(d) {
        $scope.src_gray = 'data:image/jpeg;base64,'+d.image_gray;
        $scope.src_hsv = 'data:image/jpeg;base64,'+d.image_hsv;
        $scope.src_face = 'data:image/jpeg;base64,'+d.image_face;
        $scope.src_orig = d.image_orig;
        $scope.verb = 'Streaming'
        $scope.has_data = true;
        console.log("FACE_DATA");
      })
   
      $scope.capture = function() {
        $scope.captureStatus = flip_obj[$scope.captureStatus];
        console.log('capting..', $scope.captureStatus);
      }

      var streaming_callback = function(stream) {
        // video.src = webkitURL.createObjectURL(stream);
        video.src = window.URL.createObjectURL(stream); 
      }
      var error_callback = function(err) {
        console.log("Unable to get video stream!")
      }

    });
  });
