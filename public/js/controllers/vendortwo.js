'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('VendorsTwoCtrl', function($scope, $http, $rootScope, $cookieStore, $location, $filter) {

 $scope.limit = 10;

  var query = $location.search();
    $rootScope.vendorSearch = query.type;

$rootScope.showSelect = true;


 

});
