'use strict';

angular.module('linkerApp')
  .controller('MainCtrl', function ($scope, $socket) {

    // $scope.center =  {
    //     lat: 51.505,
    //     lng: -0.09,
    //     zoom: 8
    // }

    // $scope.defaults =  {
    //     tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
    //     maxZoom: 14,
    //     path: {
    //         weight: 10,
    //         color: '#800000',
    //         opacity: 1
    //     }
    // }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	$socket.on('connectedUsers', function(data) {
		$scope.connectedUsers = data;
	})    

  });
