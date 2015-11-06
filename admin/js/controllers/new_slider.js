'use strict';

angular.module('sbAdminApp')
  .controller('NewSliderCtrl', function($scope, $http, $location, $rootScope, File) {
  $scope.buttonText = 'Create';

   $scope.slider = {
      name: null,
      description: null,
      created: null,
      slides: [],
      visible: true
    };



$scope.getCategories = function() {

      var url = window.remote + '/api/categories?access_token=' +
        $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.categories = res.data;
        })
    }

    $scope.getCategories();

 $scope.getPosts = function() {

      var url = window.remote + '/api/posts?access_token=' +
        $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.posts = res.data;
        })
    }

    $scope.getPosts();

 $scope.getGalleries = function() {

      var url = window.remote + '/api/galleries?access_token=' +
        $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.galleries = res.data;
        })
    }

    $scope.getGalleries();



  $scope.upload = function(file) {
     if(file){
   var text = "";
    var ext = file.name.split('.').pop();

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }


    file.fileName = text + '.' + ext;

 File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.slider.slides.push({type: "Post", title : "", image : newfile, description: "", tagline : "", id : ""});
      })
}
    }


    $scope.submitSlider = function(slider) {


      $scope.CurrentDate = new Date();



      var url = window.remote + '/api/sliders?access_token=' + $rootScope.user.accessToken;

      $http.post(url, slider)
        .success(function(res) {
          location.href = "#/dashboard/sliders";
        });
    }

  });
