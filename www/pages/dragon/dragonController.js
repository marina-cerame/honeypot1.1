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
        /*
         * Function for Dead Dragon
         * Uncomment when animation etc is ready
        */
        // if ($scope.stats.hunger <= 0) {
        //   Dragon.deadDragon();
        // }
      });
    $scope.showHelp = () => Dragon.showHelp();
  });
