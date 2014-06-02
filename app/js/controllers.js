'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('DocumentCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  	$scope.id = $routeParams.id;
  	$scope.slug = $routeParams.slug;
  }])
  .controller('SearchCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  	$scope.q = $routeParams.q;
  }]);
