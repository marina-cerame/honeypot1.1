/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.octo', [])
  .controller('OctoCtrl', function ($scope, $rootScope, $http, Octo) {
    Octo.setBackground();
    Octo.getStats()
      .then(res => {
        $scope.stats = res;
        if ($scope.stats.progress >= 100) {
          $scope.stats.hunger = 100;
          $scope.stats.happiness = 100;
        }
        if ($scope.stats.hunger <= 0) {
          Octo.deadOcto();
        }
      });
    $scope.octoTouch = Octo.octoTouch;
    $scope.showHelp = () => Octo.showHelp();
    TweenMax.to('.octo', 0, { scale: 0.7, y: -100 });
    Octo.positionOct();
    // TweenMax.to('.octo', 0, { scale: 0.7, y: -100 });
  });
