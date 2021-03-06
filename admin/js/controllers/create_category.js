'use strict';

angular.module('sbAdminApp')
  .controller('NewCategoryCtrl', function($scope, $state, $http, $location,
    $rootScope) {
    $scope.buttonText = 'Create';
    $scope.tags = null;
    $scope.formData = {
      name: null,
      description: null,
      keywords: [],
      created: null,
      tags: [],
      visible: true
    };

    $scope.getCategories = function() {

      var url = window.remote + '/api/categories?access_token=' + $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.categories = res.data;
        })
    }

    $scope.getCategories();

    $scope.createCategory = function(category) {

      $scope.CurrentDate = new Date();

      var data = {
        "name": category.name,
        "description": category.description,
        "keywords": category.keywords.split(','),
        "created": $scope.CurrentDate,
        "tags": category.tags,
        "visible": category.visible,
         "parentId" : category.parentId
      };

      var url = window.remote + '/api/categories?access_token=' + $rootScope.user.accessToken;

      $http.post(url, data)
        .success(function(res) {
          location.href = "#/dashboard/categories";
        });
    }

  });
