'use strict';

angular.module('sbAdminApp')
  .controller('ReviewsCtrl', function($scope, $http, $location, $rootScope) {
        var query = $location.search();
    $scope.id = query.id;
    $scope.getReviews = function() {

      var url = window.remote + '/api/users/'+ $scope.id + '/userReviews?access_token=' + $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.reviews = res.data;

            $scope.reviews.forEach(function(review){
    $http.get(window.remote + '/api/posts/' + review.postId + '?access_token=' + $rootScope.user.accessToken).then(function(res){
        review.post = res.data;
});
});
        })
    }

    $scope.getReviews();

    $scope.deleteReviews = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
      var url = window.remote + '/api/reviews/' + el.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getReviews();
        });
      });
    }



 $scope.activate = function(review) {
    review.active = true;
     var url = window.remote + '/api/reviews/' + review.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
        request(url, review).then(function(res) {
          $scope.getReviews();
        });
    }

$scope.disable = function(review) {
    review.active = false;
     var url = window.remote + '/api/reviews/' + review.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
        request(url, review).then(function(res) {
          $scope.getReviews();
        });
    }

 

  });
