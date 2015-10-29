'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('SearchResultsCtrl', function($scope, $http, $rootScope, $cookieStore, $location, $filter) {
       $rootScope.showSelect = false;

    var query = $location.search();
  $scope.key = query.key;

$scope.resultsPosts = $filter('filter')($rootScope.posts, $scope.key);

$scope.resultsVendors = $filter('filter')($rootScope.vendors, $scope.key);

$scope.resultsGalleries = $filter('filter')($rootScope.galleries, $scope.key);

$scope.postLimit = 5;

$scope.galleryLimit = 5;

$scope.vendorLimit = 5;

});
