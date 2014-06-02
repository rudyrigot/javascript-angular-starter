'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('HomeCtrl', ['$scope', 'Prismic', function($scope, Prismic) {
		Prismic.all().then(function(documents){
			$scope.documents = documents;
		});
	}])
	.controller('DocumentCtrl', ['$scope', '$routeParams', 'Prismic', '$location', function($scope, $routeParams, Prismic, $location) {
		Prismic.document($routeParams.id).then(function(document){
			if (document.slug === $routeParams.slug) {
				$scope.documentHtml = document.asHtml();
			}
			else if (document.slugs.indexOf($routeParams.slug) >= 0) {
				$location.path('/document/'+document.id+'/'+document.slug);
			}
			else {
				// Should display some kind of error; will just redirect to / for now
				$location.path('/');
			}
		});
	}])
	.controller('SearchCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
		$scope.searchq = $routeParams.q;
		$scope.q = $routeParams.q;
		Prismic.query('[[:d = fulltext(document, "'+$routeParams.q+'")]]').then(function(documents){
			$scope.documents = documents;
		});
	}]);
