'use strict';

angular.module('sbAdminApp')
  .controller('MenusCtrl', function($scope, $http, $location, $rootScope, $modal) {
	  $scope.items = null;
    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };
    $scope.title = 'Menus';
    $scope.buttonText = 'Menu';
    $scope.field = 'items';
     $scope.getMenus = function(){
	  var url = window.remote + '/api/menus?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.items = res.data;
		  });
    };

    $scope.getMenus();

         $scope.deleteItems = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
        var url = window.remote + '/api/menus/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getMenus();
        });
      });
    }
  });
