'use strict';

angular.module('sbAdminApp')
  .controller('UsersCtrl', function($scope, $state, $http, $location, $rootScope,
    $modal, $modalStack) {
    $scope.title = "Users";
    $scope.buttonText = "User";
    $scope.latest = "Comments";


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


    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };


    $scope.users = [];
    $scope.getUsers = function() {
      $http.get(
        window.remote + '/api/users?access_token=' + $rootScope.user.accessToken
      ).then(
        function(res) {
                         $scope.users = _.where(res.data, {'realm' : 'guest'});
        }
      );
    }

    $scope.getUsers();

    $scope.deleteUsers = function() {
      var els = angular.element('.regular-checkbox-td:checked');
      Array.prototype.forEach.call(els, function(el) {
        $scope.id = el.id;
        var url = window.remote + '/api/users/' + $scope.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.delete;
        request(url).then(function(res) {
          $scope.getUsers();
        });
      });
    }

  });
