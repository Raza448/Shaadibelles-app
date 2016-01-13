'use strict';

angular.module('sbAdminApp')
  .controller('EditAdvertCtrl', function($scope, $http, $location, $rootScope, $modal, File) {
    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };
    $scope.buttonText = 'Update';
    
    $scope.advert = {
		'title' : null,
		'description' : null,
		'content' : null
		};

 var query = $location.search();
    $scope.id = query.id;
    
    $http.get(window.remote + '/api/adverts/' + $scope.id + '?access_token=' + $rootScope.user.accessToken).then(function(res)
    {
   $scope.advert = {
		'title' : res.data.title,
		'description' : res.data.description,
		'content' : res.data.content
		};
		});

    $scope.upload = function(file, insertAction) {

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


 

    $scope.create = function(advert) {
	$scope.contentError = true;
	if(advert.content){
		$scope.contentError = false;
	}

      var data = {
        "title": advert.title,
        "description": advert.description,
        "content": advert.content
      };


if($scope.contentError == false){
      var url = window.remote + '/api/adverts/' + $scope.id +'?access_token=' + $rootScope.user.accessToken;
      $http.put(url, data).then(function(res) {
        location.href = '#/dashboard/adverts';
      });
}
    };
  });
