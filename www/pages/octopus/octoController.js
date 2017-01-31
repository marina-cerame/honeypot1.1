/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.octo', [])
  .controller('OctoCtrl', function ($scope, $rootScope, $http, Octo) {
    Octo.getStats()
      .then(res => {
        $scope.stats = res;
      });
  });
