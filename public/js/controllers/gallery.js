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

     $rootScope.showSelect = false;
  

   $scope.rowOne = 0;

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
         if(res.data.postId){
  $http.get(window.remote + '/api/posts/'+ res.data.postId).then(function(res){
         $scope.post = res.data
});
}
              if($rootScope.user.id){
			$http.get(window.remote +'/api/galleries/' + $scope.id + '/ratings?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.galleryRating = _.findWhere(res.data, { userId : $rootScope.user.id});
			});
		}


      });
});
