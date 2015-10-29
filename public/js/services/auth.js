'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbFrontEnd')
  .factory('Auth', function($q, $timeout, $cookieStore) {
      return {
    user: function() {
      var deferred = $q.defer();
      $timeout(function() {
        if ($cookieStore.get('accessToken')) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      }, 1000);
      return deferred.promise;
    }
  }
});

