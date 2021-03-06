'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.factory('File', function($q, $timeout, $cookieStore, $http, $rootScope){
      return {
    upload: function( file ) {
      var fd = new FormData();
      fd.append('img',file);
      var request = $http.post( window.remote + '/api/containers/new-sb/upload?access_token=' + $rootScope.user.accessToken,   fd , {
          'transformRequest': angular.identity,
          'headers': {
            'Content-Type': undefined
          }
        });
      return request;
      }
    }
  }
);



