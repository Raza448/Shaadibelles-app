'use strict';

angular.module('sbAdminApp')
  .controller('AdvertsCtrl', function($scope, $http, $location, $rootScope) {
	  $scope.getAdverts = function(){
      var url = window.remote + '/api/adverts?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.adverts = res.data;
		  });
    };

    $scope.getAdverts();

        $scope.deletePosts = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
      var url = window.remote + '/api/adverts/'+ $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getAdverts();
        });
      });
    }
   	      
});
