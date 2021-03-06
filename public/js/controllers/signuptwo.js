'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('sbFrontEnd') .controller('SignupTwoCtrl', function($scope, $http, $rootScope, $cookieStore, $location, File) {
$scope.events = ["mehndi", "Sangeet", "Wedding", "Reception"];

     $rootScope.showSelect = false;
  $scope.post = {
      wedding : true,
      title: null,
      description: null,
      tagline: null,
      category: null,
      date: null,
      status: 'Published',
      cover: null,
      events : [{name : "", vendors: []}],
      contents : {

      }
    };

$scope.postPublished = false;

  $scope.currentEvent = {
  name : null,
  content : null,
  gallery : [],
  vendors : []
}

  $scope.gallery = {
  title : null,
  photos : [],
  cover : null,
  created : new Date()
};


$scope.currentVendor = {};

$scope.addVendor = function(item){
 $scope.currentEvent.vendors.push(item);
 $scope.currentVendor = {};
}


$http.get('/credentials').then(function(res) {
                if (res.data) {
                    $rootScope.user = { id : res.data.userId,
                    accessToken :  res.data.accessToken }

$http.get(window.remote + '/api/users/' + $rootScope.user.id + '/post?access_token=' + $rootScope.user.accessToken ).then(function(res){


  $scope.postPublished = true;
  $scope.post =  {
      wedding : res.data.wedding,
      title: res.data.title || null,
      description: res.data.description || null,
      tagline: res.data.tagline || null,
      category: res.data.category || null,
      date: res.data.created || null,
      status: res.data.status || 'Published',
      cover: res.data.cover || null,
      events : res.data.events || [],
      contents : res.data.contents || {},
      location : res.data.location || null,
      id : res.data.id,
      userId : res.data.userId
    }; 
     $http.get(window.remote + '/api/posts/' + res.data.id +
          '/galleries?access_token=' + $rootScope.user.accessToken ).then(function(res){
         $scope.gallery = res.data;
});
});
                } else {
 location.href = '#/main/home';
}
            
            });




 $scope.newEvent = function(){
$rootScope.startLoading();
  $scope.post.events.push($scope.currentEvent);
  $scope.currentEvent = {
  content: null,
  gallery : []
}
 $rootScope.stopLoading();
}


    $scope.uploadCover = function(file) {

if(file){
  $rootScope.startLoading();
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
        $scope.post.cover = newfile;
        $scope.gallery.cover = newfile;
         $rootScope.stopLoading();
      })
}
    }

  $scope.upload = function(file, insertAction) {
  
if(file){
$rootScope.startLoading();
     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        insertAction('insertImage', newfile, true);
        $scope.gallery.photos.push(newfile);
      })
$rootScope.stopLoading();
      return true;
}

    }




$http.get(window.remote + '/api/vendors').then(function(res){
  $scope.vendors = res.data;
});


 $scope.vendorTypes = window.vendorTypes;



    $scope.publish = function(post) {

       $rootScope.startLoading();
      var data = {
         "wedding" : true,
        "title": post.title,
        "description": post.description,
        "location" : post.location,
        "tagline": post.tagline,
        "events" : post.events,
        "category": 'Real Wedding',
        "cover": post.cover || null,
        "created": post.date,
        "status": 'Published',
        "contents" : post.contents,
        "userId" : $rootScope.user.id
      };


   var request = $http.post;
      var url = window.remote + '/api/categories/' + $rootScope.site.settings.category +
        '/posts?access_token=' + $rootScope.user.accessToken;

      if(post.id){
  request = $http.put;
   var url = window.remote + '/api/posts/' + post.id +'?access_token=' + $rootScope.user.accessToken;
}



      request(url, data).then(function(res) {
        $scope.gallery.title = res.data.title;
        request(window.remote + '/api/posts/' + res.data.id +
          '/galleries?access_token=' + $rootScope.user.accessToken,  $scope.gallery);
           $scope.postPublished = true;
          $rootScope.stopLoading();
      });
    };
	
	$scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events = [{
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0,
            0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };


});

