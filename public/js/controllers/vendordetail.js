'use strict';
/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('VendorDetailCtrl', function($scope,
  $state, $stateParams, $http, $rootScope, $cookieStore, $location, $modal,
  $modalStack) {
  $rootScope.location = $location;
     $rootScope.showSelect = false;
  $scope.state = $state.current
  $scope.params = $stateParams;
  $scope.id = $stateParams.id;
  $scope.vendor = null;

    $scope.url = $location.absUrl();
 $scope.shareFacebook = function(){
FB.ui({
method: 'feed',
name: $scope.vendor.business.name,
link: $scope.url,
picture: $scope.vendor.gallery[0],
source: '',
caption: $scope.vendor.business.name,
description: $scope.vendor.category[0],
message: ''
}, function(response){
  console.log(response);
});
}

  $scope.windowOptions = {
        show: false
    };

    $scope.onClick = function (data) {
        $scope.windowOptions.show = !$scope.windowOptions.show;
        console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
        console.log('This is a ' + data);
        //alert('This is a ' + data);
    };

    $scope.closeClick = function () {
        $scope.windowOptions.show = false;
    };

$scope.pin = function(){
window.open(
'//pinterest.com/pin/create/button?media=' + $scope.vendor.gallery[0] + '&description=' + $scope.vendor.business.name + '&url='+ $scope.url, 'facebook-share-dialog',
'width=750,height=288');    
return false;
}


  $scope.contact = function(request){
  $rootScope.startLoading();
  request.email = $scope.vendor.email;
  request.content =  request.user +  ' from ' + request.location + ' ' + request.content;
  $http.post(window.remote + '/api/users/' + $scope.vendor.id + '/contact', request).then(function(res){
  $scope.requestSent = true;
  request = null;
   $rootScope.stopLoading();
});
}



  $scope.review = function() {
    if ($rootScope.user.id) {
      var modalInstance = $modal.open({
        templateUrl: 'public/views/vendor/review.html',
        size: 'lg',
        controller: 'VendorDetailCtrl'
      });
    } else {
      $("#form-content").modal('show');
    }
  };
  $scope.submitReview = function(review) {
  $rootScope.startLoading();
    $http.get(window.remote + '/api/users/' + $rootScope.user.id +
      '/post?access_token=' + $rootScope.user.accessToken).then(
      function(res) {
        review.postId = res.data.id;
        var url = window.remote + '/api/users/' + $scope.vendor.id +'/userReviews?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
        review.userId = $rootScope.user.id;
        if ($scope.userReview.id) {
          request = $http.put;
          url = window.remote + '/api/reviews/' + $scope.userReview.id +
            '?access_token=' + $rootScope.user.accessToken;
        }
        request(url, review).then(function(res) {
          $modalStack.dismissAll();
          $scope.userReview = res.data;
         $rootScope.stopLoading();
        });
      });
  };
  $scope.userReview = {
    rating: 0,
    website: null,
    content: null,
    userId: $rootScope.user.id
  }
  $scope.subrating = function(value) {
    if($rootScope.user.id){
 $rootScope.startLoading();
$http.get(window.remote + '/api/users/' + $rootScope.user.id +
      '/post?access_token=' + $rootScope.user.accessToken).then(
      function(res) {
        $scope.userReview.postId = res.data.id;
        $scope.userReview.rating = value;
        $scope.userReview.userId = $rootScope.user.id;
        var request = $http.post;
        var url = window.remote + '/api/users/' + $scope.vendor.id + '/userReviews?access_token=' + $rootScope.user.accessToken;
        if ($scope.userReview.id) {
          request = $http.put;
          url = window.remote + '/api/reviews/' + $scope.userReview.id +
            '?access_token=' + $rootScope.user.accessToken;
        }
        request(url, $scope.userReview).then(function(res) {
          $scope.userReview = res.data;
          $rootScope.stopLoading();
        });
      });
} else {
      $("#form-content").modal('show');
    }
  };

 $scope.scroll = function(value){
  window.scrollTo(0, value);

}


  $http.get(window.remote + '/api/users/' + $scope.id)
    .then(function(res) {
      $scope.vendor = res.data;
       if(res.data.geo){

       $rootScope.vendormarker = {
    coords: res.data.geo,
    id: 1,
    options: {
      draggable: false
    }
  };


       }
      $scope.gallerytwo = _.shuffle(res.data.gallery);
      $http.get(window.remote + '/api/users/' + res.data.id +
        '/userReviews?access_token=' + $rootScope.user.accessToken).then(
        function(res) {
          $scope.reviews = res.data;

$scope.vendor.totalratings = 0;
$scope.reviews.forEach(function(review){
    $scope.vendor.totalratings += review.rating || 0;
});
   var avg = $scope.vendor.totalratings/$scope.reviews.length;
   $scope.vendor.averageRating = Math.round(avg);   



          $scope.userReview = _.findWhere(res.data, {
            userId: $rootScope.user.id
          }) || {
            rating: 0,
            website: null,
            content: null,
            userId: $rootScope.user.id
          };
          $scope.reviews.forEach(function(review) {
            if (review.postId) {
              $http.get(window.remote + '/api/posts/' + review.postId +
                '?access_token=' + $rootScope.user.accessToken).then(
                function(res) {
                  review.post = res.data;
                });
            }
          });
        });
    });
});
