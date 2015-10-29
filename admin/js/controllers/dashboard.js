'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('DashboardCtrl', function($scope, $http, $location, $rootScope) {
    $scope.logout = function(){
      var url = window.remote +  '/api/Users/logout?access_token=' + $rootScope.user.accessToken;
      $http.post(url).then(function(){
        location.href="#/login";
      })
    }
});
