'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('VendorSignupCtrl', function ($scope, $http, $rootScope, $cookieStore, $location) {
    $scope.submitDisabled = false;
    $scope.vendorSignup = function (user) {
 $scope.passworderr = false;
                 $scope.emailerr = false;
                 $scope.usernameerr = false; 
        $rootScope.startLoading();
        var url = window.remote + '/api/users/register';
        $scope.submitDisabled = true;
        if(user.password === user.confirmPassword) {
		var data = {
		  'email' : user.email,
		  'username' : user.username,
		  'password' : user.password,
                   'realm' : 'vendor'
		};
  $http.post(url, data).then(function (res) {
            if (res.status == 200) {
                //Login user and get accesstoken
                $rootScope.stopLoading();

               $scope.verification = true;


            }
            else {
                $scope.err = "Sorry, We are unable to process your request now, Please try again later";
            $rootScope.stopLoading();
            }
        }, function(res){ 
               $rootScope.stopLoading();

if(res.data.error.details.messages.email){
 $scope.emailerr = true;
}
 if (res.data.error.details.messages.username){
$scope.usernameerr = true;
}
                              $scope.submitDisabled = false;     
		});
       } else {
          $rootScope.stopLoading();
          $scope.passworderr = true; 
          $scope.submitDisabled = false;
      }

      
    }
});
