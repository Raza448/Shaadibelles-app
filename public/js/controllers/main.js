'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('MainCtrl', function($http, $state, $modal, $modalStack, $scope, $rootScope, $cookieStore, $location) {



	$scope.logoutMethod = function() {
           $rootScope.startLoading();
		if ($rootScope.user.accessToken) {

		  $http.post(window.remote + '/api/users/logout?access_token=' + $rootScope.user.accessToken).then(function() {
			$rootScope.user = {};
                        $rootScope.stopLoading();
                        $state.reload();
			});
		}
            
	};


	

  $scope.loginModal = function(){
   		$("#form-content").modal('show');
  }

 $scope.reset = function(){
   		$("#form-reset-content").modal('show');
   		$("#form-content").modal('hide');
  }


 $scope.resetpassword = function(email){
  $rootScope.startLoading();
   var data = {
  'email' : email
 }
  $http.post( window.remote + '/api/users/reset', data).then(function(res){
  $scope.resetSent = true;
  $rootScope.stopLoading();
});
}
  



 $scope.signupredirect = function(){
   		$("#form-content").modal('hide');
                location.href="#/main/signup";
  }




$scope.loginandbusiness = function(userData) {
     $rootScope.startLoading();
		var url = window.remote + '/api/users/login';
		var data = {
		  'username': userData.username,
		  'password': userData.password
		};

	  $http.post(url, data).then(function(res) {

		  $rootScope.user = {
			'id' : res.data.userId,
			'accessToken' : res.data.id, 
		  };
           
   $modalStack.dismissAll();
             $rootScope.stopLoading();
             location.href = '#/main/vendorsignuptwo';
     });
	};

$scope.loginandprofile = function(userData) {
 $rootScope.startLoading();
		var url = window.remote + '/api/users/login';
		var data = {
		  'username': userData.username,
		  'password': userData.password
		};

	  $http.post(url, data).then(function(res) {

		  $rootScope.user = {
			'user' : res.data.userId,
			'accessToken' : res.data.id, 
		  };
         $modalStack.dismissAll();
            $rootScope.stopLoading();
             location.href = '#/main/signuptwo';
     });
	};

 $scope.loginmodaltwo = function(){
 var modalInstance = $modal.open({
                templateUrl: 'public/views/login.html',
                size: 'md',
                controller: 'MainCtrl'
            });
}


$scope.vendorlogintwo= function(){
 var modalInstance = $modal.open({
                templateUrl: 'public/views/vendorlogin.html',
                size: 'md',
                controller: 'MainCtrl'
            });
}


	$scope.loginMethod = function(userData) {
              $rootScope.startLoading();
		var url = window.remote + '/api/users/login';
		var data = {
		  'username': userData.username,
		  'password': userData.password
		};

	  $http.post(url, data).then(function(res) {

		  $rootScope.user = {
			'user' : res.data.userId,
			'accessToken' : res.data.id, 
		  };
             $rootScope.stopLoading();
               $state.reload();
		$("#form-content").modal('hide');
     }, function(err){
  if(err){
  console.log(err);
  console.log(err.data);
  console.log(err.data.error);
  if(err.data.error.code === "LOGIN_FAILED"){
 $rootScope.errormsg = "Username or password is incorrect, please try again";
}
 if(err.data.error.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED" ){
 $rootScope.errormsg = "Please check your email and click on activation link to activate your account then try logging in. Thanks";
}
}
});
	};
	
	$rootScope.search = function(searchKeyword) {
        
	   location.href = '#/main/searchresult?key=' + searchKeyword;
	};
	
	
});
