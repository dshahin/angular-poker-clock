'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clock', {templateUrl: 'partials/clock.html', controller: 'ClockController'});
  $routeProvider.when('/structure', {templateUrl: 'partials/structure.html', controller: 'structureController'});
  $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'settingsController'});
  $routeProvider.otherwise({redirectTo: '/clock'});
}]);
