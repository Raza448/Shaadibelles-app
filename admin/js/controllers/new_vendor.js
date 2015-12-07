'use strict';

angular.module('sbAdminApp')
  .controller('NewVendorCtrl', function($scope, $http, $location, $rootScope, File) {
    $scope.title = "New vendor";
    $scope.buttonText = "Create";
   $scope.countries = window.countries;
 $scope.formData = {
      active : true,
      realm : 'vendor',
      name: null,
      username: null,
      password: null,
      email: null,
      business: {},
      gallery: [],
      website: null,
      social: {},
      category: [],
      location : []
    };
    $scope.countries = window.countries;
    $scope.gallery = {
      title : null,
      cover : null,
      photos : [] 
    }


      $scope.upload = function(file) {
  
    if(file){
     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.formData.gallery.push(newfile);
                $scope.gallery.photos.push(newfile);

      })
      return true;
}

    }


    $scope.locations = null;
    $scope.vendorTypes = window.vendorTypes;

    $scope.register = function(vendorData, confirmpassword) {
         delete $scope.err;
           console.log(vendorData.password, confirmpassword);
       if(vendorData.password === $scope.confirmpassword){
         vendorData.location = $scope.locations.split(',');
  var url = window.remote + '/api/users/register?access_token=' + $rootScope.user.accessToken;
        var request = $http.post;
      request(url, vendorData).then(
      function(res){
          $scope.gallery = {
            title : res.data.title,
            cover : res.data.gallery[0],
            photos : res.data.gallery
          }
        $http.post(window.remote + '/api/users/' + res.data.id + '/galleries?access_token=' + $rootScope.user.accessToken, $scope.gallery).then(function(res){
            $scope.gallery = res.data;
                  location.href= '#/dashboard/vendors';

              });

        }
      ,function(res){ 

		$scope.err = res.data.error.details.messages.email || res.data.error.details.messages.username;

		});
} else {
 $scope.err = "passwords not matching";
}
    };
  });
