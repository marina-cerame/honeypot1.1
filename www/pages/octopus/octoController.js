/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.octo', [])
  .controller('OctoCtrl', function ($scope, $rootScope, $http, Octo) {
    Octo.getStats()
      .then(res => {
        $scope.stats = res;
        console.log($scope.stats, 'heres scope stats')
        if ($scope.stats.progress >= 100) {
          $scope.stats.hunger = 100;
          $scope.stats.happiness = 100;
        }
        if ($scope.stats.hunger <= 0) {
          Octo.deadOcto();
        }
      });
    $scope.showHelp = () => Octo.showHelp();
    TweenMax.to('.octo', 0, { scale: 0.7, y: -100 });
    Octo.positionOct();
    // TweenMax.to('.octo', 0, { scale: 0.7, y: -100 });
  });
