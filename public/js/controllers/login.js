'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd')
  .controller('LoginCtrl', function($scope, $http, $rootScope, $cookieStore,
    $location) {
    $cookieStore.remove('id');
    $cookieStore.remove('accessToken');
    $rootScope.user = {};
    $scope.login = function(newuser) {
      var url = window.remote + '/api/users/login';
      var data = {
        'username': newuser.username,
        'password': newuser.password
      };
      $http.post(url, data).then(function(res) {

        location.href = '/';

      });
    };

  });
