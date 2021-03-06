'use strict';

angular.module('sbAdminApp')
  .controller('NewWeddingCtrl', function($scope, $http, $location, $rootScope,
    File) {
    $scope.post = {
      title: null,
      description: null,
      tagline: null,
      date: new Date(),
      status: 'Published',
      cover: null,
      events : [{ name : 'mehndi', vendors: []}, { name : 'sangeet', vendors: []}, { name : 'wedding', vendors: []}, { name : 'reception', vendors: []}]      
    };


$scope.current = {};

 $scope.vendorpush = function(item, current){
item.vendors.push({ type : current.type, vendor: current.vendor});
 $scope.current = {};
}


 

 $scope.getvendors = function() {
      $http.get(
        window.remote + '/api/users?access_token=' + $rootScope.user.accessToken
      ).then(
        function(res) {
                   $scope.vendors = _.where(res.data, {'realm' : 'vendor'});
        }
      );
    }

    $scope.getvendors();



  $scope.vendorTypes = ['Photography', 'Venue', 'Event planner', 'Event Decor', 'Makeup', 'Mehndi', 'Hair', 'Cinematography', 'Bridal Fashion', 'Cakes and treats', 'Catering', 'DJ', 'Entertainment', 'Favars', 'Flaral Design', 'Jewelry','Lighting', 'Manswear', 'Rentals', 'Shoes','Stationery','Transportation', 'Wedding Officiant'];



    $scope.gallery = [];


    $scope.upload = function(file, insertAction) {
  
    if(file){
     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        insertAction('insertImage', newfile, true);
        $scope.gallery.push(newfile);
      })
      return true;
}

    }


    $scope.uploadCover = function(file) {
  
    if(file){
  File.upload(file).success(function(res) {

        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.post.cover = newfile;
        $scope.gallery.cover = newfile;
      })
}
    }


    $scope.collapseVar = 0;

    $scope.check = function(x) {

      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.title = 'New';
    $scope.buttonTextOne = 'Publish';
    $scope.buttonTextTwo = 'Save';
    $scope.categories = null;
    $scope.tags = null;

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

 $scope.gallery = {
  title : null,
  photos : [],
  cover : null
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


    $scope.publish = function(post) {
		
	 $scope.descriptionError = true;
	 $scope.contentError = true;
	 $scope.coverError = true;
	 
	 if(post.description){
		  $scope.descriptionError = false;
	 }
	 if(post.cover){
		$scope.coverError = false;
	 }

      var data = {
        "wedding" : true,
        "title": post.title,
        "description": post.description,
        "tagline": post.tagline,
        "content": post.content,
        "cover": post.cover || null,
        "created": post.date,
        "status": post.status || 'Published',
        "events" : post.events
      };


        $scope.gallery.title = post.title;

if($scope.descriptionError == false && $scope.coverError == false){
      var url = window.remote + '/api/categories/' + post.category +
        '/posts?access_token=' + $rootScope.user.accessToken;
      $http.post(url, data).then(function(res) {
        $http.post(window.remote + '/api/posts/' + res.data.id +
          '/galleries?access_token=' + $rootScope.user.accessToken, $scope.gallery);
        location.href = '#/dashboard/weddings';
      });
	};
   };

  });
