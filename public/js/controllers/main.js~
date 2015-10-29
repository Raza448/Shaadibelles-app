'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('MainCtrl', function($http, $modal, $scope, $rootScope, $cookieStore, $location) {



	$scope.logoutMethod = function() {
		if ($rootScope.user.accessToken) {

		  $http.post(window.remote + '/api/users/logout?access_token=' + $rootScope.user.accessToken).then(function() {
			$cookieStore.remove('Sbid');
			$cookieStore.remove('SbaccessToken');
                        $cookieStore.remove('userId');
			$cookieStore.remove('access_token');
			$rootScope.user = {};
			$location.path('/main/home');
			});
		}
	};
	

  $scope.loginModal = function(){
   		$("#form-content").modal('show');
  }

  $scope.vendorLogin = function(){
   		$("#vendor-form-content").modal('show');
  }



 $scope.signupredirect = function(){
   		$("#form-content").modal('hide');
                location.href="#/main/signup";
  }


	$scope.loginVendorMethod = function(userData) {
		var url = window.remote + '/api/vendors/login';
		var data = {
		  'username': userData.username,
		  'password': userData.password
		};

	  $http.post(url, data).then(function(res) {
			$cookieStore.put('Sbid', res.data.userId);
			$cookieStore.put('SbaccessToken', res.data.id);
			$cookieStore.put('SbVendorid', res.data.userId);
			$cookieStore.put('SbVendoraccessToken', res.data.id);
		  $rootScope.user = {
			'user' : res.data.userId,
			'accessToken' : res.data.id, 
		  };
             $rootScope.vendor = {
			'user' : res.data.userId,
			'accessToken' : res.data.id, 
		  };
		$("#vendor-form-content").modal('hide');
     });
	};


	$scope.loginMethod = function(userData) {
		var url = window.remote + '/api/users/login';
		var data = {
		  'username': userData.username,
		  'password': userData.password
		};

	  $http.post(url, data).then(function(res) {
			$cookieStore.put('Sbid', res.data.userId);
			$cookieStore.put('SbaccessToken', res.data.id);
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
