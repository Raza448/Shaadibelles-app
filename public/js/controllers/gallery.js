'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('GalleryCtrl', function($scope, $state, $stateParams, $http, $rootScope, $cookieStore, $location) {
    $scope.state = $state.current
    $scope.params = $stateParams;
    $scope.id = $stateParams.id;

    $scope.nextSlide = function(){
    $scope.slide = $scope.gallery.photos[$scope.gallery.photos.indexOf($scope.slide) + 4 ]	
    }

    $scope.prevSlide = function(){
    $scope.slide = $scope.gallery.photos[$scope.gallery.photos.indexOf($scope.slide) - 4 ]	
    }

$scope.pin = function(){
window.open(
'//pinterest.com/pin/create/button?media=' + $scope.gallery.cover + '&description=' + $scope.gallery.description || $scope.vendor.business.name + '&url='+ $scope.url, 'facebook-share-dialog',
'width=750,height=288');    
return false;
}


     $rootScope.showSelect = false;
    $scope.url = $location.absUrl();

   $scope.rowOne = 0;
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

   $scope.rowoneNext = function(){
   
    if($scope.rowOne < $scope.gallery.photos.length) {
    $scope.rowOne += 1;
   } 
  } 

  $scope.rowonePrevious = function(){
    if($scope.rowOne > 0){
   $scope.rowOne -= 1;
  }
  }

  $scope.setImage = function(i){
   $scope.rowOne = i;
}






	$scope.galleryRating = {
		'stars' : 0
	}
	 
	$scope.rating = function(value){
		if($rootScope.user.id){
			
			
			if($scope.galleryRating && $scope.galleryRating.id){
				var url = window.remote +'/api/ratings/' + $scope.galleryRating.id + '?access_token='+ $rootScope.user.accessToken;
			var data = {
				'stars'  : value
			};
			$http.put(url, data).then(function(res){
				 $scope.galleryRating = res.data;
	               
			});
			}
			else {
			var url = window.remote +'/api/galleries/' + $scope.id + '/ratings?access_token='+ $rootScope.user.accessToken;
			var data = {
				'stars'  : value, 
				'name'   : $rootScope.userData.username, 
				'email'  : $rootScope.userData.email, 
				'userId' : $rootScope.user.id,
			};
			$http.post(url, data).then(function(res){
				 $scope.galleryRating = res.data;
	               
			});	
			}
		}else{
			$("#form-content").modal('show');
		}
		
	}

  $http.get(window.remote + '/api/galleries' ).then(function(res){
 $scope.galleries = res.data;
});






      $http.get(window.remote + '/api/galleries/' + $scope.id)
      .then(function(res) {
          $scope.gallery = res.data;
           $scope.slide = res.data.photos[0];
          $scope.slidelimit = res.data.photos.length - 4;
         if(res.data.postId){

  $http.get(window.remote + '/api/posts/'+ res.data.postId).then(function(res){
         $scope.post = res.data
});
} 
  if(res.data.vendorId){
 $http.get(window.remote + '/api/users/'+ res.data.vendorId).then(function(res){
         $scope.vendor = res.data
});
}
              if($rootScope.user.id){
			$http.get(window.remote +'/api/galleries/' + $scope.id + '/ratings?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.galleryRating = _.findWhere(res.data, { userId : $rootScope.user.id});
			});
		}


      });
});
