
'use strict';

angular.module('sbAdminApp')
  .controller('EditPageCtrl', function($scope, $http, $location, $rootScope,
    File) {
    $scope.page = {
      title: null,
      description: null,
      content: null,
      cover: null
    };


var query = $location.search();
    $scope.id = query.id;


    $scope.uploadCover = function(file) {
 if(file){
    file.fileName = text + '.' + ext;
      File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        $scope.page.cover = newfile;
      })
}
    }

 $scope.upload = function(file, insertAction) {

 if(file){
 

      File.upload(file).success(function(res) {
        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        insertAction('insertImage', newfile, true);
      })
      return true;

}
    }



    $http.get(window.remote + '/api/pages/' + $scope.id +
        '?access_token=' + $rootScope.user.accessToken)
      .then(function(res) {
          $scope.page = res.data;
      });

  
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



    $scope.publish = function(page) {
		$scope.contentError = true;
	if(page.content){
		$scope.contentError = false;
	 }
	if($scope.contentError == false){
      var url = window.remote + '/api/pages/' + $scope.id  +'?access_token=' + $rootScope.user.accessToken;
      $http.put(url, page).then(function(res) {
        location.href = '#/dashboard/pages';
      });
	};
    };

  });





