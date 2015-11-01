'use strict';

angular.module('sbAdminApp')
  .controller('EditVendorCtrl', function($scope, $http, $location, $rootScope) {
    $scope.title = "Update vendor";
    $scope.buttonText = "Update";
    $scope.countries = window.countries
    $scope.formData = {
      realm : 'vendor',
      name: null,
      username: null,
      email: null,
      vendor : {
		  category : null,
		  business : {
			  name : null,
			  email: null,
			  city : null,
			  state : null,
			  country : null
			  },
		  website : null,
		  social : {
			  facebook : null,
			  twitter : null,
			  instagram: null
			  },
		  locations : [],
		  photos: [],
		  card : {},
		  billing : {}	  
			  
		  }      
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
