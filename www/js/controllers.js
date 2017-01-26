angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $location, $rootScope) {

  $scope.logout = function() {
    for (var prop in $rootScope) {
      if (prop.substring(0,1) !== '$') {
        delete $rootScope[prop];
      }
    }
    $location.path('/login');
  };

  $scope.goToStore = function() {
    $location.path('/app/store');
  };
});
