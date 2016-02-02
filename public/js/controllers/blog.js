'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('PostsCtrl', function($http, $scope, $rootScope, $cookieStore, $location) {
    $scope.posts = [];
    var query = $location.search();
    $scope.id = query.id;
	$scope.blogLimit = 5;
    $http.get(window.remote + '/api/posts?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.resutls = res.data;
      });
});
