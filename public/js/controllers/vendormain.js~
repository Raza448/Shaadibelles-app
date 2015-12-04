'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('VendorsMainCtrl', function($scope, $http, $rootScope, $cookieStore, $location, $filter) {

 $scope.limit = 10;

  $scope.newcontact = function(contact) {
           $rootScope.startLoading();
		$http.post('/contact' , contact).then(function(res){
 $scope.contactsent = true;
 $rootScope.stopLoading();
});
            
	};


$rootScope.showSelect = true;



 

});
