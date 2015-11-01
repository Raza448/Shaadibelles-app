'use strict';

angular.module('sbAdminApp')
  .controller('EditReviewCtrl', function($sce, $scope, $http, $location, File,
    $rootScope,
    $modal) {

      var query = $location.search();
    $scope.id = query.id;
      $scope.collapseVar = 0;

     $http.get(window.remote + '/api/reviews/' + $scope.id + '?access_token=' + $rootScope.user.accessToken).then(function(res){
   $scope.review = res.data;
});

    $scope.check = function(x) {

      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.title = 'New';
    $scope.buttonText = 'Create';



    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };




    $scope.getPosts = function() {

      var url = window.remote + '/api/posts?access_token=' +
        $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.posts = res.data;
        })
    }

    $scope.getPosts();


    $scope.submit = function(data) {

      var url = window.remote + '/api/reviews/' + $scope.id + '?access_token=' + $rootScope.user.accessToken;
      $http.put(url, data).then(function(res) {      
        location.href = '#/dashboard/vendor-reviews?id=' + $scope.review.vendorId;
      });
    };

  });
