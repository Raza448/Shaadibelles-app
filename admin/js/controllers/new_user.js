'use strict';

angular.module('sbAdminApp')
  .controller('NewUserCtrl', function($scope, $http, $location, $rootScope) {
    $scope.title = "New User";
    $scope.buttonText = "Create";
    $scope.userData = {
      name: null,
      username: null,
      email: null,
      password: null
    };

    $scope.register = function(userData) {
      var data = {
        'name': userData.name,
        'username': userData.username,
        'email': userData.email,
        'password': userData.password
      };

        var url = window.remote + '/api/users?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
      request(url, data).then(
      function(){
		  location.href= '#/dashboard/users';

        }
      )
    };
  });
