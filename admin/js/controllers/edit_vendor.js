'use strict';

angular.module('sbAdminApp')
  .controller('EditVendorCtrl', function($scope, $http, $location, $rootScope) {
    $scope.title = "Update vendor";
    $scope.buttonText = "Update";
    $scope.formData = {
      realm : 'vendor',
      name: null,
      username: null,
      email: null     
    };

        $scope.vendorTypes = window.vendorTypes;


      var query = $location.search();
      $scope.id = query.id;

      $http.get(window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.vendor = res.data;
        $scope.formData = res.data;
      });


    $scope.register = function(vendorData) {
    
        var url = window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
      request(url, vendorData).then(
      function(){
		  location.href= '#/dashboard/vendors';

        }
      )
    };
  });
