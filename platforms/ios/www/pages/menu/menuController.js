/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('starter.controllers', [])
.controller('AppCtrl', function ($scope, $location, $rootScope, Menu) {
  $scope.logout = () => Menu.logout();

  $scope.goToStore = () => {
    $location.path('/app/store');
  };
});
