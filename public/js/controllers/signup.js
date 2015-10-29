'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('SignupCtrl', function ($scope, $http, $rootScope, $cookieStore, $location) {
    $scope.submitDisabled = false;
     $rootScope.showSelect = false;
    $scope.signup = function (user) {
        var url = window.remote + '/api/users/register';
        $scope.submitDisabled = true;
        if(user.password === user.confirmPassword) {
		var data = {
		  'email' : user.email,
		  'username' : user.username,
		  'password' : user.password
		};
  $http.post(url, data).then(function (res) {

            if (res.status == 200) {
                //Login user and get accesstoken
               $scope.verification = true;
              
            }
            else {
                $scope.err = "Sorry, We are unable to process your request now, Please try again later";
            }
        }, function(res){ 

		$scope.err = res.data.error.details.messages.email || res.data.error.details.messages.username;
                              $scope.submitDisabled = false;     
		});
       } else {
          $scope.err = ['Paswords not matching'];
          $scope.submitDisabled = false;
      }

      
    }
});
