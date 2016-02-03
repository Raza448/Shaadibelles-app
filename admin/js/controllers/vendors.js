'use strict';

angular.module('sbAdminApp')
  .controller('VendorsCtrl', function($scope, $state, $http, $location, $rootScope,
    $modal, $modalStack) {
    $scope.title = "vendors";
    $scope.buttonText = "vendor";
    $scope.latest = "Comments";

    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };



    $scope.activate = function(user) {
    user.active = true;
     var url = window.remote + '/api/users/' + user.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
        request(url, user).then(function(res) {
          $state.reload();
        });
    }

$scope.disable = function(user) {
    user.active = false;
     var url = window.remote + '/api/users/' + user.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
        request(url, user).then(function(res) {
          $state.reload();
        });
    }



    $scope.vendors = [];

    $scope.getvendors = function() {
      $http.get(
        window.remote + '/api/users?access_token=' + $rootScope.user.accessToken
      ).then(
        function(res) {
                                         $scope.vendors = _.where(res.data, {'realm' : 'vendor'});
        }
      );
    }

    $scope.getvendors();
	console.log(1);
    $scope.deletevendors = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
        var url = window.remote + '/api/users/' + $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getvendors();
        });
      });
    }

  });
