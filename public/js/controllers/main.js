'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('MainCtrl', function($http, $modal, $modalStack, $scope, $rootScope, $cookieStore, $location) {



	$scope.logoutMethod = function() {
		if ($rootScope.user.accessToken) {

		  $http.post(window.remote + '/api/users/logout?access_token=' + $rootScope.user.accessToken).then(function() {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

			$rootScope.user = {};
			$location.path('/main/home');
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
   var data = {
  'email' : email
 }
  $http.post( window.remote + '/api/users/reset', data).then(function(res){
  $scope.resetSent = true;

});
}
  



 $scope.signupredirect = function(){
   		$("#form-content").modal('hide');
                location.href="#/main/signup";
  }




$scope.loginandbusiness = function(userData) {
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
            
             location.href = '#/main/vendorsignuptwo';
     });
	};

$scope.loginandprofile = function(userData) {
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
		$("#form-content").modal('hide');
     });
	};
	
	$rootScope.search = function(searchKeyword) {
	   location.href = '#/main/searchresult?key=' + searchKeyword;
	};
	
	
});
