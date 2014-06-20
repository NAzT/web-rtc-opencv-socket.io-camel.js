'use strict';

/**
 * @ngdoc function
 * @name linkerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the linkerApp
 */
angular.module('linkerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
