/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('starter.controllers', [])
.controller('AppCtrl', function ($scope, $location, $rootScope) {
  $scope.logout = () => {
    for (const prop in $rootScope) {
      if (prop.substring(0, 1) !== '$') {
        delete $rootScope[prop];
      }
    }
    $location.path('/login');
  };

  $scope.goToStore = () => {
    $location.path('/app/store');
  };
});
