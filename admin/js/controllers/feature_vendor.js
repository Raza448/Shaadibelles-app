'use strict';

angular.module('sbAdminApp')
  .controller('FeatureVendorCtrl', function($scope, $http, $location, $rootScope,
    $modal, $modalStack, File) {
      $http.get(window.remote + '/api/admins/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken).then(
      function(res){
                if(res.data.featured_vendor){
		  $scope.featuredVendor = res.data.featured_vendor;
                    }
		  }
   );
   
   $scope.saveTxt = 'Save';
 $scope.featuredVendor = {
             title : null,
             description: null,
             slides: [],
             vendor: null
           };



  $scope.upload = function(file) {
     if(file){
 File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.featuredVendor.slides.push(newfile);
      })
}
    }

      

$scope.getVendors = function() {

      var url = window.remote + '/api/vendors?access_token=' + $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.vendors = res.data;
        })
    }

 $scope.getVendors();

   $scope.submit = function(){
	   $scope.saveTxt = 'Saving';
	   var url = window.remote + '/api/admins/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken;
	   $http.put(url, {
		   'featured_vendor' : $scope.featuredVendor,

		   }).then(function(res){
			   $scope.saveTxt = 'Saved';
			   });
	   };

  });
