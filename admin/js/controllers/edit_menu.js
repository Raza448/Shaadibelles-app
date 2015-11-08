'use strict';

angular.module('sbAdminApp')
  .controller('EditMenuCtrl', function($scope, $http, $location, $rootScope) {
   $scope.buttonText = 'Update';
  $scope.types = ['URL', 'Post', 'Gallery','Category', 'Page', 'Vendors', 'Galleries', 'Blog', 'Home', 'Contact', 'Review'];
  $scope.typesTwo = ['URL', 'Post', 'Gallery', 'Page', 'Category'];
  $scope.pages = null;
  $scope.posts = null;

   $scope.menu = {
      name: null,
      description: null,
      created: null,
      items: [],
      visible: true
    };

 $scope.newItem = function(){
$scope.menu.items.push({ order: $scope.menu.items.length + 1, type: 'URL', sub : false})
}

       $scope.addSubitem = function(item){
      if(item.subitems){
        item.subitems.push({ order: $scope.menu.items.length + 1, type: 'URL'});
      }
      else{
        item.subitems = [{ order: $scope.menu.items.length + 1, type: 'URL'}];
      }
     item.sub = true;
    }


   $scope.getPosts = function(){
	  var url = window.remote + '/api/posts?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.posts = res.data;
		  });
    };

      $scope.getCategories = function(){
	  var url = window.remote + '/api/categories?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.categories = res.data;
		  });
    };

$scope.getPages = function(){
	  var url = window.remote + '/api/pages?access_token=' + $rootScope.user.accessToken;
	  $http.get(url).then(function(res){
		  $scope.pages = res.data;
		  });
    };

$scope.getPages();


        $scope.getPosts();
    $scope.getCategories();

    var query = $location.search();
    $scope.id = query.id;

    $http.get(window.remote + '/api/menus/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.menu.name = res.data.name;
        $scope.menu.description = res.data.description;
        $scope.menu.created = res.data.created;
        $scope.menu.items = res.data.items;
        $scope.menu.visible = res.data.visible;
      });



    $scope.submitMenu = function(menu) {




      var data = {
        "name": menu.name,
        "description": menu.description,
        "created": menu.created,
        "items": menu.items,
        "visible": menu.visible,
      };

      var url = window.remote + '/api/menus/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;

      $http.put(url, data)
        .success(function(res) {
          location.href = "#/dashboard/menus";
        });
    }


  });
