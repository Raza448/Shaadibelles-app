'use strict';

angular.module('sbAdminApp')
  .controller('EditWidgetCtrl', function($scope, $http, $location, $rootScope , File, $modal, $modalStack, $sce) {
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


$scope.setYoutubeUrl = function(url){
  delete $scope.widget.video;
  
  $scope.widget.video = {
 type : "youtube",
 url : $sce.trustAsHtml(url)
};

}

$scope.setUrl = function(url){
  delete $scope.widget.youtube;
    $scope.widget.video = {
 type : "url",
 url : url
};

}




 $scope.uploadVideo = function(file) {
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
  delete $scope.widget.youtube;
 $scope.widget.video = {
 type : "url",
 url : newfile
};
      })
      }
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
        $scope.widget.cover = newfile;
      }) 
  }
    }

    var query = $location.search();
    $scope.id = query.id;

    $http.get(window.remote + '/api/widgets/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
           $scope.widget = res.data;
           if(res.data.youtube){
             $scope.widget.youtube = $sce.trustAsHtml(res.data.youtube);
}
      });

    $scope.submitWidget = function(widget) {
   
      var url = window.remote + '/api/widgets/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;

      $http.put(url, widget)
        .then(function(res) {
          location.href = "#/dashboard/widgets";
        });
    }


  });
