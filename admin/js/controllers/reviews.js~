'use strict';

angular.module('sbAdminApp')
  .controller('ReviewsCtrl', function($scope, $http, $location, $rootScope) {
        var query = $location.search();
    $scope.id = query.id;
    $scope.getReviews = function() {

      var url = window.remote + '/api/vendors/'+ $scope.id + '/reviews?access_token=' + $rootScope.user.accessToken;

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

 

  });
