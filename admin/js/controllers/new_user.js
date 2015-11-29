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
    $scope.confirmpassword = null;   
    $scope.register = function(userData) {
     if(userData.password === $scope.confirmpassword){
 var data = {
         'realm' : 'guest',
        'name': userData.name,
        'username': userData.username,
        'email': userData.email,
        'password': userData.password
      };

        var url = window.remote + '/api/users/register?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
      request(url, data).then(
      function(){
		  location.href= '#/dashboard/users';

        }
      , function(res){ 

		$scope.err = res.data.error.details.messages.email || res.data.error.details.messages.username;

		});
 } else {
 $scope.err = "passwords not matching";
}
    };
  });
