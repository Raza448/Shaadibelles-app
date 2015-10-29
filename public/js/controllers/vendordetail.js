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

  $scope.contact = function(request){

  request.email = $scope.vendor.email;
  request.content =  request.user +  ' from ' + request.location + ' ' + request.content;
  $http.post(window.remote + '/api/vendors/' + $scope.vendor.id + '/contact', request).then(function(res){
  $scope.requestSent = true;
});
}



  $scope.review = function() {
    if ($rootScope.user.id) {
      var modalInstance = $modal.open({
        templateUrl: 'views/vendor/review.html',
        size: 'lg',
        controller: 'VendorDetailCtrl'
      });
    } else {
      $("#form-content").modal('show');
    }
  };
  $scope.submitReview = function(review) {
    $http.get(window.remote + '/api/users/' + $rootScope.user.id +
      '/post?access_token=' + $rootScope.user.accessToken).then(
      function(res) {
        review.postId = res.data.id;
        var url = window.remote + '/api/vendors/' + $scope.vendor.id +
          '/reviews?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
        if ($scope.userReview.id) {
          request = $http.put;
          url = window.remote + '/api/reviews/' + $scope.userReview.id +
            '?access_token=' + $rootScope.user.accessToken;
        }
        request(url, review).then(function(res) {
          $modalStack.dismissAll();
          $scope.userReview = res.data;
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
$http.get(window.remote + '/api/users/' + $rootScope.user.id +
      '/post?access_token=' + $rootScope.user.accessToken).then(
      function(res) {
        $scope.userReview.postId = res.data.id;
        $scope.userReview.rating = value;
        var request = $http.post;
        var url = window.remote + '/api/vendors/' + $scope.vendor.id +
          '/reviews?access_token=' + $rootScope.user.accessToken;
        if ($scope.userReview.id) {
          request = $http.put;
          url = window.remote + '/api/reviews/' + $scope.userReview.id +
            '?access_token=' + $rootScope.user.accessToken;
        }
        request(url, $scope.userReview).then(function(res) {
          $scope.userReview = res.data;
        });
      });
} else {
      $("#form-content").modal('show');
    }
  };

 $scope.scroll = function(value){
  window.scrollTo(0, value);

}


  $http.get(window.remote + '/api/vendors/' + $scope.id)
    .then(function(res) {
      $scope.vendor = res.data;
      $scope.gallerytwo = _.shuffle(res.data.gallery);
      $http.get(window.remote + '/api/vendors/' + res.data.id +
        '/reviews?access_token=' + $rootScope.user.accessToken).then(
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
