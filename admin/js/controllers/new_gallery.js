'use strict';

angular.module('sbAdminApp')
  .controller('NewGalleryCtrl', function($scope, $http, $location, $rootScope,
    File) {
    $scope.gallery = {
      title: null,
      description: null,
      tagline: null,
      date: new Date(),
      cover: null,
      photos : []      
    };

       





    $scope.upload = function(file) {
  
    if(file){
     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.gallery.photos.push(newfile);
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

 $scope.buttonText = "create";


 $scope.upload = function(file) {
  
    if(file){
     File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;

        $scope.gallery.photos.push(newfile);
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
        $scope.gallery.cover = newfile;
      })
}
    }




    $scope.getCategories = function() {

      var url = window.remote + '/api/categories?access_token=' +
        $rootScope.user.accessToken;

      $http.get(url)
        .then(function(res) {
          $scope.categories = res.data;
        })
    }

    $scope.getCategories();


    $scope.publish = function(gallery) {
     gallery.created = new Date();
	 $scope.galleryImage = true;
	$scope.coverError = true;
	
	if(gallery.photos.length > 0){
		//console.log(gallery.photos);
		 $scope.galleryImage = false;
	}
	if(gallery.cover){
		 $scope.coverError = false;
	}
	
	if($scope.galleryImage == false && $scope.coverError == false){
		 var url = window.remote + '/api/galleries?access_token=' + $rootScope.user.accessToken;
		  $http.post(url, gallery).then(function(res) {
		   
			location.href = '#/dashboard/galleries';
		  });
	 }
    };

  });
