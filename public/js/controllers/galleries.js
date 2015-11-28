'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd').controller('GalleriesCtrl', function($http, $state, $stateParams, $window, $route, $scope, $rootScope, $cookieStore, $location) {
    $scope.galleries = [];
     
    $http.get(window.remote + '/api/galleries')
      .then(function(res) {
        $scope.galleries = res.data;
        $scope.galleries.forEach(function(gallery){
 $http.get('/api/galleries/' + gallery.id + '/ratings').then(function(res){
  gallery.ratings = res.data;
                            gallery.totalratings = 0;
                            gallery.ratings.forEach(function(review) {
                                gallery.totalratings += review.stars || 0;
                            });
                            var avg = gallery.totalratings / gallery.ratings.length;
                            gallery.averageRating = Math.round(avg);
});
});
      });

$scope.sort = function(value){
 if( value === 'ascend'){
 $scope.galleries = _.sortBy($scope.galleries, function(gallery){ return gallery.averageRating; });
} else {
var ascend = _.sortBy($scope.galleries, function(gallery){ return gallery.averageRating; });
 $scope.galleries = ascend.reverse();
}
}

     $rootScope.showSelect = false;
 

});
