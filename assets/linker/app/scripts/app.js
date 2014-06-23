'use strict';

angular.module('linkerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'vintagejs'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/camera', {
        templateUrl: 'views/camera.html',
        controller: 'CameraCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
