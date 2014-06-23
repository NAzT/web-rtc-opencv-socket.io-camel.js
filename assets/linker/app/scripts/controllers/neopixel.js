'use strict';

/**
 * @ngdoc function
 * @name linkerApp.controller:NeopixelCtrl
 * @description
 * # NeopixelCtrl
 * Controller of the linkerApp
 */
angular.module('linkerApp')
  .controller('NeopixelCtrl', function ($scope) {
  		var word = { waiting: 'Connect', connect: 'Disconnect'}

  		$scope.disabled = "disabled";
  		$scope.status = word["waiting"];
  });
