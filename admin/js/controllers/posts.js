'use strict';

angular.module('sbAdminApp')
  .controller('PostsCtrl', function($scope, $http, $location, $rootScope,
    $modal) {
    $scope.collapseVar = 0;
    $scope.posts = null;

    $scope.check = function(x) {

      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.getPosts = function(){
      var url = window.remote + '/api/posts?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.posts = res.data;
		  });
    };

    $scope.getPosts();

        $scope.deletePosts = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
      var url = window.remote + '/api/posts/'+ $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getPosts();
        });
      });
    }

  });
