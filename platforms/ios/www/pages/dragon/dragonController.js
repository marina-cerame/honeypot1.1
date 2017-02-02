/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.dragon', [])
  .controller('DragonCtrl', function ($scope, $rootScope, $http, Dragon) {
    Dragon.getStats()
      .then(res => {
        $scope.stats = res;
        if ($scope.stats.progress >= 100) {
          $scope.stats.hunger = 100;
          $scope.stats.happiness = 100;
        }
      });
    $scope.showHelp = () => Dragon.showHelp();
  });
