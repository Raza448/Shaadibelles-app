'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('CategoriesCtrl', function($http, $state, $stateParams, $window, $route, $scope, $rootScope, $cookieStore, $location) {
    $scope.posts = [];
    $scope.category = $stateParams.id;
    $scope.state = $state.current
    $scope.params = $stateParams;

    $http.get(window.remote + '/api/categories/' + $scope.category +'/posts')
      .then(function(res) {
        $scope.posts = res.data;
      });

     $rootScope.showSelect = false;

});
