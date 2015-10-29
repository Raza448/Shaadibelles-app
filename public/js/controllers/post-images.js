'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('PostImagesCtrl', function($scope, $state, $stateParams, $http, $rootScope, $cookieStore, $location) {
    $scope.id = $stateParams.id;
    $scope.state = $state.current
    $scope.params = $stateParams;
    $scope.gallery = null;
 $scope.changeEvent = function(item){
     $scope.currentEvent = item;
}
     $rootScope.showSelect = false;

$http.get(window.remote + '/api/posts/' + $scope.id +'/ratings')
		.then(function(res){
			$scope.relatedRating = res.data;
		});
	$scope.postRating = {
		'stars' : 0
	}
	 
	$scope.rating = function(value){
		if($rootScope.user.id){
			
			
			if($scope.postRating && $scope.postRating.id){
				var url = window.remote +'/api/ratings/' + $scope.postRating.id + '?access_token='+ $rootScope.user.accessToken;
			var data = {
				'stars'  : value
			};
			$http.put(url, data).then(function(res){
				 $scope.postRating = res.data;
	               
			});
			}
			else {
			var url = window.remote +'/api/posts/' + $scope.id + '/ratings?access_token='+ $rootScope.user.accessToken;
			var data = {
				'stars'  : value, 
				'name'   : $rootScope.userData.username, 
				'email'  : $rootScope.userData.email, 
				'userId' : $rootScope.user.id,
			};
			$http.post(url, data).then(function(res){
				 $scope.postRating = res.data;
			});	
			}
		}else{
			$("#form-content").modal('show');
		}
		
	}




      $http.get(window.remote + '/api/galleries/' + $scope.id)
      .then(function(res) {
          $scope.gallery = res.data;

$http.get(window.remote +'/api/galleries/' + $scope.id + '/ratings?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.galleryRating = _.findWhere(res.data, { userId : $rootScope.user.id});
			});



               if(res.data.postId){
  $http.get(window.remote + '/api/posts/' + res.data.postId).then(function(res){
       $scope.post = res.data;
 
   if(res.data.userId){


$http.get(window.remote +'/api/users/' + res.data.userId + '/reviews?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.reviews = res.data;

                             $scope.reviews.forEach(function(review){
    $http.get(window.remote +'/api/vendors/' + review.vendorId + '?access_token=' + $rootScope.user.accessToken).then(function(res){
				review.vendor = res.data;
			});
});


			});
          
}
});
}      












      });

});
