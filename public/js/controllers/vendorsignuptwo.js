'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('VendorSignupTwoCtrl', function ($scope, $http, $rootScope, $cookieStore, $location, File,        $anchorScroll) {
    angular.element("#toTop").click();
     $rootScope.showSelect = false;
    $scope.vendor = {
       category : [null, null],
       location : [],
       website : null,
       business : {},
       social : {},
       billing : {},
       gallery : [],
       geo : null
    };

 $rootScope.$watch('marker.coords', function(coords){
  if(coords){
 $scope.vendor.geo = coords;
}
});

$scope.newcontact = function(contact) {
           $rootScope.startLoading();
		$http.post('/contact' , contact).then(function(res){
 $scope.contactsent = true;
 $rootScope.stopLoading();
 contact = null;
});
            
};

 $scope.gallery = {
  title : null,
  photos : [],
  cover : null,
  created : new Date()
 };

$scope.locationremove = function(location){
var i  = $scope.vendor.location.indexOf(location);
 $scope.vendor.location.splice(i, 1);
}


$scope.locationpush = function(location){
 $scope.vendor.location.push(location);
 $scope.locationOne = null;
}

  $scope.locationOne = null;
  

  $scope.categoryOne = null;
  $scope.categoryTwo = null;
  $scope.$watch('categoryOne', function(category){
  if(category){
  $scope.vendor.category[0] = category;
}
});


$http.get('/credentials').then(function(res) {
                if (res.data) {
                    $rootScope.user = { id : res.data.userId,
                    accessToken :  res.data.accessToken }

 var url = window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken;
    $http.get(url).then(function(res){
            $scope.vendor.business = res.data.business || {};
            $scope.vendor.social = res.data.social || {};
            $scope.vendor.gallery = res.data.gallery || [];      
            $scope.categoryOne =  res.data.category[0] || null;
            $scope.categoryTwo =  res.data.category[1] || null;
            $scope.vendor.location = res.data.location || null;
            $scope.vendor.website = res.data.website || null;
           $scope.vendor.billing = res.data.billing ||  {};
           if(res.data.geo){
  $scope.vendor.geo = res.data.geo;
  $rootScope.marker.coords = res.data.geo;
}
         $http.get(window.remote + '/api/users/' + $rootScope.user.id + '/galleries?access_token=' + $rootScope.user.accessToken).then(function(res){
           $scope.gallery = res.data;        
    });
    });
                }
            
            });



 

 $scope.$watch('categoryTwo', function(category){
  if(category){
  $scope.vendor.category[1] = category;
}
});

  $scope.step1 = false;
  $scope.step2 = true;
  $scope.step3 = true;

  $rootScope.countries = window.countries;
  $rootScope.vendorCategories = window.vendorTypes;
    $scope.saveStep1 = function(){
   $rootScope.startLoading();
    var url = window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken;
    $http.put(url, $scope.vendor).then(function(res){
            $rootScope.stopLoading();
 $scope.step1 = true;
 window.scrollTo(0, 600);


    $scope.step2 = false;
            $scope.vendor.business = res.data.business || {};
            $scope.vendor.social = res.data.social || {};
            $scope.vendor.gallery = res.data.gallery || [];      
            $scope.vendor.category =  res.data.category || [null, null];
            $scope.vendor.location = res.data.location ||  [];
            $scope.vendor.website = res.data.website || null;
           $scope.vendor.billing = res.data.billing ||  {};
           if(res.data.geo){
  $scope.vendor.geo = res.data.geo;

}
        var request = $http.post;
            $scope.gallery.title = res.data.business.title;
            $scope.gallery.cover = res.data.gallery[0];
              if($scope.gallery.id){
                 request  = $http.put;
              }
               request(window.remote + '/api/users/' + $rootScope.user.id + '/galleries?access_token=' + $rootScope.user.accessToken, $scope.gallery).then(function(res){
            $scope.gallery = res.data;
              });
         

    });
    
   };




   $scope.saveStep2 = function(){
   $rootScope.startLoading();
    var url = window.remote + '/api/users/' + $rootScope.user.id + '?access_token=' + $rootScope.user.accessToken;
    $http.put(url, $scope.vendor).then(function(res){
            $rootScope.stopLoading();
$scope.step2 = true;
 window.scrollTo(0, 1100);

   $("#vendorsaved").modal('show');
            $scope.vendor.business = res.data.business || {};
            $scope.vendor.social = res.data.social || {};
            $scope.vendor.gallery = res.data.gallery || [];      
            $scope.vendor.category =  res.data.category || [null, null];
            $scope.vendor.location = res.data.location ||  [];
            $scope.vendor.website = res.data.website || null;
           $scope.vendor.billing = res.data.billing ||  {};
           if(res.data.geo){
  $scope.vendor.geo = res.data.geo;

}
        var request = $http.post;
            $scope.gallery.title = res.data.business.title;
            $scope.gallery.cover = res.data.gallery[0];
              if($scope.gallery.id){
                 request  = $http.put;
              }
               request(window.remote + '/api/users/' + $rootScope.user.id + '/galleries?access_token=' + $rootScope.user.accessToken, $scope.gallery).then(function(res){
            $scope.gallery = res.data;
              });
         

    });
    
   };



 $scope.upload = function(file) {
           if(file){
$rootScope.startLoading();

     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.vendor.gallery.push(newfile);
        $scope.gallery.photos.push(newfile);
           $rootScope.stopLoading();
      })
}
    }

 

 

$scope.gopremium = function(){
   $("#vendorsaved").modal('hide');
   location.href = '#/main/premium';
}






  


   $scope.handleStripe = function(status, response) {
     $rootScope.startLoading();
    if (response.error) {
    $rootScope.stopLoading();
    } else {
      $rootScope.startLoading();
      var data = {
        'userId': $rootScope.user.id,
        'token' : response.id
      }
      $http.post( window.remote + '/api/users/subscribe?access_token=' + $rootScope.user.accessToken, data).then(function(res) {
         $rootScope.stopLoading();
         location.href = '#/main/home';

      });


    }
  }



});

