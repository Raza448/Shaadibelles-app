'use strict';

angular.module('sbAdminApp')
  .controller('SocialCtrl', function($scope, $http, $location, $rootScope,
    $modal, $modalStack) {

   $http.get(window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken).then(
      function(res){
		  $scope.item = res.data.social;
		  }
   );


$scope.saveTxt = 'Save';

   $scope.save = function(){
	   $scope.saveTxt = 'Saving';
	   var url = window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken;
	   $http.put(url, { 
		   
		   'social' : $scope.item
		   }).then(function(res){
			   $scope.saveTxt = 'Saved';
			   });
	   };

  });
