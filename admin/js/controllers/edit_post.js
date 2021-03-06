'use strict';

angular.module('sbAdminApp')
  .controller('EditPostCtrl', function($scope, $http, $location, File,
    $rootScope,
    $modal) {
    $scope.post = {
      title: null,
      description: null,
      content: null,
      tagline: null,
      date: new Date(),
      status: 'Published',
      cover: null    
    };



      $http.get(window.remote + '/api/categories?access_token=' +
        $rootScope.user.accessToken
        )
        .then(function(res) {
          $scope.categories = res.data;
        })


    var query = $location.search();
    $scope.id = query.id;



    $scope.upload = function(file, insertAction) {

    if(file){
  File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' + fileName;
        insertAction('insertImage', newfile, true);
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
        $scope.post.cover = newfile;
      })
}
    }


   $scope.uploadEventImage = function(file, item) {
     if(file){
 File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' + fileName;
        $scope.gallery.push(newfile);
        $scope.post.events[$scope.post.events.indexOf(item)].gallery.push(newfile);
      })
      return true;
}
    }



    $http.get(window.remote + '/api/posts/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
        $scope.post.title = res.data.title;
        $scope.post.description = res.data.description;
        $scope.post.content = res.data.content;
        $scope.post.tagline = res.data.tagline;
        $scope.post.category = res.data.categoryId;
        $scope.post.date = res.data.created;
        $scope.post.status = res.data.status || 'Published';
        $scope.post.cover = res.data.cover;
         if(res.data.events){
        $scope.post.events = res.data.events;
         }

        $http.get(window.remote + '/api/posts/' + $scope.id +
            '/galleries?access_token=' + $rootScope.user.accessToken)
          .then(function(res) {
            $scope.gallery = res.data.photos;
          });
       
      });



    $scope.collapseVar = 0;

    $scope.check = function(x) {

      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };

    $scope.title = 'Edit';
    $scope.buttonTextOne = 'Update';
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




    $scope.publish = function(post) {
		
	 $scope.descriptionError = true;
	 $scope.contentError = true;
	 $scope.coverError = true;
	 
	 if(post.description){
		  $scope.descriptionError = false;
	 }
	 if(post.content){
		$scope.contentError = false;
	 }
	 if(post.cover){
		$scope.coverError = false;
	 }

      var data = {
        "title": post.title,
        "description": post.description,
        "tagline": post.tagline,
        "content": post.content,
        "cover": post.cover || null,
        "created": post.date,
        "status": post.status || 'Published',
        "categoryId": post.category
      };

       if(post.events){
        data.events = post.events;
        }

if($scope.descriptionError == false && $scope.contentError == false && $scope.coverError == false){
      var url = window.remote + '/api/posts/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken;
      $http.put(url, data).then(function(res) {
        $http.put(window.remote + '/api/posts/' + $scope.id +
          '/galleries?access_token=' + $rootScope.user.accessToken, {
            photos: $scope.gallery
          });
        location.href = '#/dashboard/posts';
      });
};
    };
  });
