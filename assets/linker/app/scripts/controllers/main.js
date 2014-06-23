'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket, $location) {
    $scope.page = "main.js"

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
      })

    });

    $scope.getClass = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }
  });
