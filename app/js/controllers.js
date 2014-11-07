'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('HomeCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
		var page = parseInt($routeParams.page) || "1";
		Prismic.ctx().then(function(ctx){
			ctx.api.form('everything').page(page).ref(ctx.ref).submit(function(err, documents){
				if (err) {
					// Should display some kind of error; will just redirect to / for now
					$location.path('/');
				}
				else {
					$scope.documents = documents;
					// Angular doesn't repeat over collections created on the fly, so we have to create it here
					if (documents.total_pages > 1) $scope.paginationRange = _.range(1, documents.total_pages+1);
				}
			});
		});
	}])
	.controller('DocumentCtrl', ['$scope', '$routeParams', 'Prismic', '$location', function($scope, $routeParams, Prismic, $location) {
		Prismic.document($routeParams.id).then(function(document){
			if (document.slug === $routeParams.slug) {
				Prismic.ctx().then(function(ctx) {
					$scope.documentHtml = document.asHtml(ctx);
				})
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
		var page = parseInt($routeParams.page) || "1";
		Prismic.ctx().then(function(ctx){
			ctx.api.form('everything').query('[[:d = fulltext(document, "'+$routeParams.q+'")]]')
				.page(page).ref(ctx.ref).submit(function(err, documents){
					if (err) {
						// Should display some kind of error; will just redirect to / for now
						$location.path('/');
					}
					else {
						$scope.documents = documents;
						// Angular doesn't repeat over collections created on the fly, so we have to create it here
						if (documents.total_pages > 1) $scope.paginationRange = _.range(1, documents.total_pages+1);
					}
				});
		});
	}])
	.controller('RefCtrl', ['$scope', '$location', '$window', 'Prismic', function ($scope, $location, $window, Prismic) {
		Prismic.ctx().then(function(ctx){
			// Get available refs.
			$scope.refs = ctx.api.data.refs;
			// Find selected release based on URL query.
			var release = _.where($scope.refs, {ref: $location.search().ref});
			$scope.selectedRelease = release.length > 0 ? release[0] : $scope.refs[0];
			$scope.newRef = function(selected) {
				// When select element changed, update ctx object and configure
				// $location service.
				ctx.ref = selected.ref;
				$location.path($location.path()).search({'ref': selected.ref});
				// Alternatively, you can reload the page.
				// $window.location.href = $location.path()+"?ref="+selected.ref;
			}
		});
	}]);
