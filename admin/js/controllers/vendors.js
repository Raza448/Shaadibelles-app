'use strict';

angular.module('sbAdminApp')
  .controller('VendorsCtrl', function($scope, $http, $location, $rootScope,
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


    $scope.vendors = [];

    $scope.getvendors = function() {
      $http.get(
        window.remote + '/api/vendors?access_token=' + $rootScope.user.accessToken
      ).then(
        function(res) {
                   $scope.vendors = res.data;
        }
      );
    }

    $scope.getvendors();

    $scope.deletevendors = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
        var url = window.remote + '/api/vendors/' + $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getvendors();
        });
      });
    }

  });
