

angular.module('sbAdminApp')
  .controller('NewAdvertCtrl', function($scope, $http, $location, $rootScope, $modal, File) {
    $scope.check = function(x) {
      if (x == $scope.collapseVar)
        $scope.collapseVar = 0;
      else
        $scope.collapseVar = x;
    };
    $scope.buttonText = 'Create';
    $scope.today = new Date();
    $scope.advert = {
		'title' : null,
		'description' : null,
		'content' : null,
		'created' : $scope.today
		};
		




   



    $scope.upload = function(file, insertAction) {

console.log('3', file.name)
  var text = "";
    var ext = file.name.split('.').pop();
console.log('4', ext)
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

async.forEach([1,2,3,4,5], function (item, callback){ 
        text += possible.charAt(Math.floor(Math.random() * possible.length));
console.log('5', text);
    file.name = text + '.' + ext;
    callback(); // tell async that the iterator has completed
console.log('5', file.name);
}, function(err) {
File.upload(file).success(function(res) {


        var containerName = res.result.files.img[0].container;
        var fileName = res.result.files.img[0].name;
        var newfile = 'https://' + containerName + '.s3.amazonaws.com/' +
          fileName;
        insertAction('insertImage', newfile, true);
      })
      return true;

});  
    
    }


 

    $scope.create= function(advert) {


      var data = {
        "title": advert.title,
        "description": advert.description,
        "created": advert.created,
        "content": advert.content
      };



      var url = window.remote + '/api/adverts?access_token=' + $rootScope.user.accessToken;
      $http.post(url, data).then(function(res) {
        location.href = '#/dashboard/adverts';
      });
    };
  });
