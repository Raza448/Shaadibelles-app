'use strict';

angular.module('sbAdminApp')
  .controller('NewVendorCtrl', function($scope, $http, $location, $rootScope) {
    $scope.title = "New vendor";
    $scope.buttonText = "Create";
   $scope.countries = window.countries;
 $scope.formData = {
      realm : 'vendor',
      name: null,
      username: null,
      password: null,
      email: null
    };

    $scope.vendorTypes = window.vendorTypes;

    $scope.register = function(vendorData) {
        var url = window.remote + '/api/users?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
      request(url, vendorData).then(
      function(){
		  location.href= '#/dashboard/vendors';

        }
      )
    };
  });
