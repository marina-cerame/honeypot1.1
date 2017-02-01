/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.pet', [])
  .controller('PetCtrl', function ($scope, $rootScope, $http, Pet) {
    $scope.bearTouch = Pet.bearTouch;
    console.log($rootScope.pet, 'root pet')
    Pet.bearGrow();
    Pet.setBackground();
    Pet.getStats()
      .then(res => {
        $scope.stats = res;
      });
    $scope.showHelp = () => Pet.showHelp();
  });
