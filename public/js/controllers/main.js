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

$scope.newcontact = function(contact) {
           $rootScope.startLoading();
		$http.post('/contact' , contact).then(function(res){
 $scope.contactsent = true;
 $rootScope.stopLoading();
});
            
	};



	

  $scope.loginModal = function(){
   		$("#form-content").modal('show');
  }
  $scope.closeModal = function (formType) {
	if(formType === 'login'){
		$("#form-content").modal('hide');
	}else if(formType === 'reset'){
		$("#form-reset-content").modal('hide');
	}else if(formType === 'saved'){
		$("#vendorsaved").modal('hide');
	}
  };

 $scope.reset = function(){
   		$("#form-reset-content").modal('show');
   		$("#form-content").modal('hide');
  }


 $scope.resetpassword = function(email){
  $rootScope.startLoading();
   var data = {
  'email' : email
 }
  /* $http.post( window.remote + '/api/users/reset', data).then(function(res){
  $scope.resetSent = true;
  $rootScope.stopLoading();
}); */

$http.post( window.remote + '/api/users/reset', data)
	.success(function(res) {
	  $scope.resetSent = true;
	  $scope.resetError = true;
	  $rootScope.stopLoading();
	})
	.error(function(res, status) {	  
	  $scope.resetSent = true;
	  $scope.resetError = false;
	  $rootScope.stopLoading();
	})
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
           
   		$("#vendor-login").modal('hide');
             $rootScope.stopLoading();
             location.href = '/#/main/vendorsignuptwo';
     },  function(err){
  if(err){
  console.log(err);
  console.log(err.data);
  console.log(err.data.error);
  if(err.data.error.code === "LOGIN_FAILED"){
 $rootScope.errormsg = "Username or password is incorrect, please try again";
}

if(res.data.error.status === 500 && res.data.error.message === "disabled"){
	location.href = "#/main/disabled";
	   		$("#vendor-login").modal('hide');


}
 if(err.data.error.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED" ){
 $rootScope.errormsg = "Please check your email and click on activation link to activate your account then try logging in. Thanks";
}
}
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
   		$("#login-two").modal('hide');
            $rootScope.stopLoading();
             location.href = '/#/main/signuptwo';
     },  function(err){
  if(err){
  console.log(err);
  console.log(err.data);
  console.log(err.data.error);
  if(err.data.error.code === "LOGIN_FAILED"){
 $rootScope.errormsg = "Username or password is incorrect, please try again";
}
if(res.data.error.status === 500 && res.data.error.message === "disabled"){
	location.href = "#/main/disabled";
	   		$("#login-two").modal('hide');


}
 if(err.data.error.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED" ){
 $rootScope.errormsg = "Please check your email and click on activation link to activate your account then try logging in. Thanks";
}
}
});
	};

 $scope.loginmodaltwo = function(){
   		$("#login-two").modal('show');

}


$scope.vendorlogintwo= function(){
   		$("#vendor-login").modal('show');

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
               location.href = '/';
     }, function(err){
  if(err){
  console.log(err);
  console.log(err.data);
  console.log(err.data.error);
  if(err.data.error.code === "LOGIN_FAILED"){
 $rootScope.errormsg = "Username or password is incorrect, please try again";
}

if(err.data.error.status === 500 && err.data.error.message === "disabled"){
	location.href = "#/main/disabled";
	   		$("#form-content").modal('hide');


}
 if(err.data.error.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED" ){
 $rootScope.errormsg = "Please check your email and click on activation link to activate your account then try logging in. Thanks";
}
}
});
	};
	
	$rootScope.search = function(searchKeyword) {
		$state.go("main.searchresult", { key: searchKeyword });
	   //location.href = '#/main/searchresult?key=' + searchKeyword;
	};
	
	
});
