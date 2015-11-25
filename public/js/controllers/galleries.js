'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('GalleriesCtrl', function($http, $state, $stateParams, $window, $route, $scope, $rootScope, $cookieStore, $location) {
    $scope.galleries = [];

    $http.get(window.remote + '/api/galleries')
      .then(function(res) {
        $scope.galleries = res.data;
      });

     $rootScope.showSelect = false;
     $scope.keywords = [];
    $scope.galleries.forEach(function(gallery){
   gallery.keywords.forEach(function(keyword){
 $scope.keywords.push(keyword);
});
});

});
