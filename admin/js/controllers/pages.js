'use strict';

angular.module('sbAdminApp')
  .controller('PagesCtrl', function($scope, $http, $location, $rootScope,
    $modal) {
    $scope.collapseVar = 0;
    $scope.posts = null;

    $scope.check = function(x) {

      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.getPages = function(){
      var url = window.remote + '/api/pages?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.pages = res.data;
		  });
    };

    $scope.getPages();

        $scope.deletePages = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
      var url = window.remote + '/api/pages/'+ $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getPages();
        });
      });
    }

  });
