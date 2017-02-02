/* globals angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.firstPet', [])

  .controller('FirstPetCtrl', function ($scope, $location, $http, $rootScope, First) {
    $scope.pet = {};

    First.bearShrink();

    $scope.createFirst = () => {
      First.makeFirstPet($scope.pet);
    };

    $scope.showHelp = () => First.showHelp();
  });
