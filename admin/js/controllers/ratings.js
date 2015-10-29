'use strict';

angular.module('sbAdminApp')
  .controller('RatingsCtrl', function($sce, $scope, $http, $location, File,
    $rootScope,
    $modal) {

    var query = $location.search();
    $scope.id = query.id;


    $http.get(window.remote + '/api/posts/' + $scope.id +
        '/ratings?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.ratings = res.data;
      });



  
  });
