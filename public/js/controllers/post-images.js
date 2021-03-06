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
	$scope.galleryLimit = 4;
    $scope.url = $location.absUrl();


$scope.pin = function(){
window.open(
'//pinterest.com/pin/create/button?media=' + $scope.gallery.cover + '&description=' + $scope.gallery.description || $scope.vendor.business.name + '&url='+ $scope.url, 'facebook-share-dialog',
'width=750,height=288');    
return false;
}

$scope.shareFacebook = function(){
FB.ui({
method: 'feed',
name: $scope.gallery.title || $scope.vendor.business.name,
link: $scope.url,
picture: $scope.gallery.cover || $scope.vendor.gallery[0],
source: '',
caption: $scope.gallery.tagline || $scope.vendor.business.name,
description: $scope.gallery.description || $scope.vendor.category[0],
message: ''
}, function(response){
  console.log(response);
});
}

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
			 $rootScope.startLoading();
			
			if($scope.postRating && $scope.postRating.id){
				var url = window.remote +'/api/ratings/' + $scope.postRating.id + '?access_token='+ $rootScope.user.accessToken;
			var data = {
				'stars'  : value
			};
			$http.put(url, data).then(function(res){
				 $scope.postRating = res.data;
	                         $rootScope.stopLoading();
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
                                   $rootScope.stopLoading();
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
    if($scope.post.events){
 $scope.currentEvent = $scope.post.events[0];
}
   if(res.data.userId){


$http.get(window.remote +'/api/users/' + res.data.userId + '/reviews?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.reviews = res.data;

                             $scope.reviews.forEach(function(review){
    $http.get(window.remote +'/api/users/' + review.vendorId + '?access_token=' + $rootScope.user.accessToken).then(function(res){
				review.vendor = res.data;
			});
});


			});
          
}
});
}      












      });

});
