'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('PostCtrl', function($scope, $state, $stateParams, $http, $rootScope, $cookieStore, $location) {
    $scope.state = $state.current
    $scope.params = $stateParams;
    $scope.id = $stateParams.id;
    $scope.post = null;
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
  $scope.currentEvent = null;

  $scope.changeEvent = function(item){
     $scope.currentEvent = item;
}	
	

    $http.get(window.remote + '/api/posts/' + $scope.id )
      .then(function(res) {
        $scope.post = res.data;
  if(res.data.events){
        $scope.currentEvent = res.data.events[0];
}

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
        if(res.data){
        
		
		if($rootScope.user.id){
			$http.get(window.remote +'/api/posts/' + $scope.id + '/ratings?access_token=' + $rootScope.user.accessToken).then(function(res){
				$scope.postRating = _.findWhere(res.data, { userId : $rootScope.user.id});
			});
		}
	

        }
     $http.get(window.remote + '/api/categories/' + res.data.categoryId +'/posts')
      .then(function(res) {
        $scope.relatedPosts = res.data;
      });

      $http.get(window.remote + '/api/posts/' + $scope.id +'/galleries')
      .then(function(res) {
        $http.get(window.remote + '/api/galleries/' + res.data.id).then(function(res){
          $scope.gallery = res.data.photos;
        });
      });
      });


});
