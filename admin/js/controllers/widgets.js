'use strict';

angular.module('sbAdminApp')
  .controller('WidgetsCtrl', function($scope, $http, $location, $rootScope, $modal) {
	  $scope.items = null;
    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };
    $scope.title = 'Widgets';
    $scope.buttonText = 'widget';
    $scope.field = 'items';
     $scope.getWidgets = function(){
	  var url = window.remote + '/api/widgets?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.items = res.data;
		  });
    };

    $scope.getWidgets();

         $scope.deleteItems = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
        var url = window.remote + '/api/widgets/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getWidgets();
        });
      });
    }
  });
