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

  });
