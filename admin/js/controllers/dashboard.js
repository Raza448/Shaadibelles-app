'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('DashboardCtrl', function($scope, $http, $location, $rootScope) {
    $scope.logout = function(){
      var url = '/api/Users/logout?access_token=' + $rootScope.user.accessToken;
      $http.post(url).then(function(){
        location.href="/";
      })
    }

    $http.get('/api/users').then(function(res){
  $scope.users = _.where(res.data, { 'realm' : 'guest'});
    $scope.vendors = _.where(res.data, { 'realm' : 'vendor'});
});

 $http.get('/api/posts').then(function(res){
  $scope.posts = _.where(res.data, { 'wedding' : false});
    $scope.weddings = _.where(res.data, { 'wedding' : true});
});


$http.get('/api/galleries').then(function(res){
  $scope.galleries = res.data;
});


$http.get('/api/reviews').then(function(res){
  $scope.reviews = res.data;
});

$http.get('/api/ratings').then(function(res){
  $scope.ratings = res.data;
});


 $scope.activate = function(review) {
    review.active = true;
     var url = window.remote + '/api/reviews/' + review.id + '?access_token=' + $rootScope.user.accessToken;
        var request = $http.put;
        request(url, review).then(function(res) {
          $scope.getReviews();
        });
    }



});
