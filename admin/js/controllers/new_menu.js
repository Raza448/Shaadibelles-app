'use strict';

angular.module('sbAdminApp')
  .controller('NewMenuCtrl', function($scope, $http, $location, $rootScope) {

  $scope.buttonText = 'Create';
  $scope.types = ['URL', 'Post', 'Gallery','Category', 'Page', 'Vendors', 'Galleries' , 'Blog', 'Home', 'Contact', 'Review'];
  $scope.typesTwo = ['URL', 'Post', 'Gallery', 'Page', 'Category'];
  $scope.posts = null;
  $scope.pages = null;
   $scope.menu = {
      name: null,
      description: null,
      created: null,
      items: [{ type: 'URL', sub : false}],
      visible: true
    };
   $scope.getPosts = function(){
	  var url = window.remote + '/api/posts?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.posts = res.data;
		  });
    };

 $scope.getPages = function(){
	  var url = window.remote + '/api/pages?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.pages = res.data;
		  });
    };

 $scope.newItem = function(){
$scope.menu.items.push({ type: 'URL', sub : false})
}

$scope.getPages();

    $scope.addSubitem = function(item){
      if(item.subitems){
        item.subitems.push({ type: 'URL'});
      }
      else{
        item.subitems = [];
        item.subitems.push({ type: 'URL'});
      }
     item.sub = true;
    }


   $scope.getCategories = function(){
	  var url = window.remote + '/api/categories?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.categories = res.data;
		  });
    };

    $scope.getPosts();
    $scope.getCategories();
    $scope.submitMenu = function(menu) {
     
     
      $scope.CurrentDate = new Date();

      var data = {
        "name": menu.name,
        "description": menu.description,
        "created": $scope.CurrentDate,
        "items": menu.items,
        "visible": menu.visible,
      };
      

      var url = window.remote + '/api/menus?access_token=' + $rootScope.user.accessToken;

      $http.post(url, data)
        .success(function(res) {
          location.href = "#/dashboard/menus";
        });
    }

  });
