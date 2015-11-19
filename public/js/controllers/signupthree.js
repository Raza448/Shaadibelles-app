'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('SignupThreeCtrl', function($scope, $http, $rootScope, $cookieStore, $location) {
  $http.get(window.remote + '/api/vendors').then(function(res){
  $scope.vendors = res.data;
});

     $rootScope.showSelect = false;

    $scope.reviewsubmit = false;
  
   $scope.reviews = [
  { name : 'Photography' , contents: []},{ name : 'Venue', contents: [] } ,{ name: 'Event planner', contents: []}, {name :'Event Decor', contents: []}, {name: 'Makeup', contents:[]}, { name:'Mehndi', contents:[]},{ name : 'Hair', contents: []}, { name:'Cinematography', contents:[]}, {name :'Bridal Fashion', contents: []},{ name: 'Cakes and treats', contents: []},{ name: 'Catering', contents:[]},{name: 'DJ', contents:[]}, { name:'Entertainment', contents: []}, { name:'Favars', contents: []},{ name:'Flaral Design', contents:[]}, { name :'Jewelry', contents: []},{ name:'Lighting', contents:[]},{name:'Manswear', contents: []},{ name:'Rentals', contents:[]}, { name:'Shoes', contents: []},{ name:'Stationery', contents:[]},{ name:'Transportation', contents:[]}, { name:'Wedding Officiant'
,contents:[] } ]

  $scope.reviews.forEach(function(item){
  item.contents.push({ vendorId : null, website: null, content: null, rating: null});
});

 $scope.publish = function(){
 $rootScope.startLoading();
   $scope.reviews.forEach(function(item){
      item.contents.forEach(function(review){
       
      if(review.content != null){
       review.userId = $rootScope.user.id;
         $http.get( window.remote + '/api/users/' + $rootScope.user.id + '/post?access_token='+ $rootScope.user.accessToken).then(function(res){
         review.postId = res.data.id;
        $http.post(window.remote + '/api/reviews', review
        ).then(function(res){ 

         
});
  
});
  
}
});

});
 $rootScope.stopLoading();
 $scope.reviewsubmit = true;
}

});
