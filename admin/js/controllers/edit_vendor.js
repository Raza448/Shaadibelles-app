'use strict';

angular.module('sbAdminApp')
  .controller('EditVendorCtrl', function($scope, $http, $location, $rootScope, File) {
    $scope.title = "Update vendor";
    $scope.buttonText = "Update";
    


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


$scope.gallery = {
      title : null,
      cover : null,
      photos : [] 
    }

    $scope.countries = window.countries;
        $scope.vendorTypes = window.vendorTypes;


      var query = $location.search();
      $scope.id = query.id;

      $http.get(window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.vendor = res.data;
        $scope.formData = res.data;
         $scope.locations = res.data.location.toString();
         $http.get(window.remote + '/api/users/' + res.data.id + '/galleries?access_token=' + $rootScope.user.accessToken).then(function(res){
           $scope.gallery = res.data;        
              });
      });


    $scope.register = function(vendorData) {
    
        var url = window.remote + '/api/users/'+ $scope.id +'?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
      request(url, vendorData).then(
      function(res){

        if($scope.gallery.id){
         $http.put(window.remote + '/api/users/' + res.data.id + '/galleries?access_token=' + $rootScope.user.accessToken, $scope.gallery).then(function(res){
            $scope.gallery = res.data;
                  location.href= '#/dashboard/vendors';

              }); 
        }
         else {

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

        }
      )
    };
  });
