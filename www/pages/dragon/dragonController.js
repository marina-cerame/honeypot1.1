/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.dragon', [])
  .controller('DragonCtrl', function ($scope, $rootScope, $http, Dragon) {
    Dragon.getStats()
      .then(res => {
        $scope.stats = res;
      });
    $scope.showHelp = () => Dragon.showHelp();
  });
