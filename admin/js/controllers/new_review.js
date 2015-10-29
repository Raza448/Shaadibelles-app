'use strict';

angular.module('sbAdminApp')
  .controller('NewReviewCtrl', function($scope, $http, $location, $rootScope,
    File) {

      var query = $location.search();
    $scope.id = query.id;

    $scope.collapseVar = 0;

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


      var query = $location.search();
    $scope.id = query.id;



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
      var url = window.remote + '/api/vendors/'+ $scope.id + '/reviews?access_token=' + $rootScope.user.accessToken;
      $http.post(url, data).then(function(res) {      
        location.href = '#/dashboard/vendor-reviews?id=' + $scope.id;
      });
    };

  });
