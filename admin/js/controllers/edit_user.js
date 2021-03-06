'use strict';

angular.module('sbAdminApp')
  .controller('EditUserCtrl', function($scope, $http, $location, $rootScope) {
    $scope.title = "Update User";
    $scope.buttonText = "Update";


    $scope.formData = {
      realm : 'guest',
      name: null,
      username: null,
      password: null,
      email: null
    };


      var query = $location.search();
      $scope.id = query.id;

      $http.get(window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
		  $scope.user = res.data;
        $scope.formData.name = res.data.name;
        $scope.formData.id = res.data.id;
        $scope.formData.email = res.data.email;
        $scope.formData.username = res.data.username;
      });


    $scope.register = function(userData) {
      var data = {
        'name': userData.name,
        'username': userData.username,
        'email': userData.email
      };
        var url = window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
      request(url, data).then(
      function(){
		  location.href= '#/dashboard/users';

        }
      )
    };
	$scope.publish = function(userData) {

      var url = window.remote + '/api/users/' + $scope.id  +'?access_token=' + $rootScope.user.accessToken;
      $http.put(url, userData).then(function(res) {
        location.href= '#/dashboard/users';
      });
    };
  });
