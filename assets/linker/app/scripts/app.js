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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
