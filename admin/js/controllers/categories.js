'use strict';

angular.module('sbAdminApp')
  .controller('CategoriesCtrl', function($scope, $http, $location, $rootScope) {

    $scope.selected = [];

    $scope.init = function() {
      $scope.getCategories();
    };

    $scope.getCategories = function() {

      var url = window.remote + '/api/categories?access_token=' + $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.categories = res.data;
        })
    }

    $scope.deleteCategories = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
      var url = window.remote + '/api/categories/' + $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getCategories();
        });
      });
    }

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse :
        false;
      $scope.predicate = predicate;
    };


  });
