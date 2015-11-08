'use strict';

angular.module('sbAdminApp')
  .controller('EditSliderCtrl', function($scope, $http, $location, $rootScope , File) {
   $scope.buttonText = 'Update';



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
        $scope.slider.slides.push(newfile);
      }) 
  }
    }

    var query = $location.search();
    $scope.id = query.id;

    $http.get(window.remote + '/api/sliders/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
           $scope.slider = res.data;
      });

    $scope.submitSlider = function(slider) {

      var url = window.remote + '/api/sliders/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;

      $http.put(url, slider)
        .success(function(res) {
          location.href = "#/dashboard/sliders";
        });
    }


  });
