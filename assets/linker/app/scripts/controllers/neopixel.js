'use strict';

/**
 * @ngdoc function
 * @name linkerApp.controller:NeopixelCtrl
 * @description
 * # NeopixelCtrl
 * Controller of the linkerApp
 */
angular.module('linkerApp')
  .controller('NeopixelCtrl', function ($scope, $socket) {
  		var word = { waiting: 'Connect', connected: 'Connected'}
  		var cls = { waiting: 'default', connected: 'success' }
  		
  		$scope.status =  'waiting';
  		$scope.button_status = word[$scope.status];
      
      $socket.on('serialConnected', function(data) {
        console.log('serialConnected', data);
        $scope.status = data.isConnected ? 'connected' : 'waiting';
        $scope.button_status = word[$scope.status];
        $scope.serialConnected = data;

      });

      $scope.connect = function() {
        console.log("DO SCOPE.CONNECT")
        socket.get('/serial/connect', function(r) {
          $scope.response = r;
          console.log(r);
          if (!r.err) {
            $scope.status = 'connected';
            $scope.button_status = word[$scope.status];
          }
          $scope.$apply();
        })
      }

      $scope.close = function() {
        console.log("DO SCOPE.DISCONNECT")
        socket.get('/serial/close', function(r) {
          $scope.response = r;
          if (!r.err) {
            $scope.status = 'waiting';
            $scope.button_status = word[$scope.status];
          }
          $scope.$apply();
        })
      }

  		$scope.isDisabled = function() {
  			return $scope.status == 'waiting'
  		}

  		$scope.getStatusCls = function() {
  			return cls[$scope.status];
  		}

  		$scope.write = function(v) {
  			socket.get('/serial/write/' + v, function(r) {
  				console.log(r);
  			});
  		}

  });
