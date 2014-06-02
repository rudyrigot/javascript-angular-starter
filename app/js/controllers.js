'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('HomeCtrl', ['$scope', 'Prismic', function($scope, Prismic) {
		Prismic.all().then(function(documents){
			$scope.documents = documents;
		});
	}])
	.controller('DocumentCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
		$scope.id = $routeParams.id;
		$scope.slug = $routeParams.slug;
	}])
	.controller('SearchCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
		$scope.q = $routeParams.q;
	}]);
