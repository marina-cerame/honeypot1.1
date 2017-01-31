/* globals angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.adoptPet', [])

  .controller('adoptPetCtrl', function ($scope, $http, $rootScope, $location, Adopt) {
    $scope.newpet = {};
    $scope.newpet.pet_type_id = 1;

    $scope.$on('$ionicSlides.slideChangeStart', (event, data) => {
      $scope.newpet.pet_type_id = data.slider.activeIndex + 1;
    });

    Adopt.getPets()
      .then(res => {
        $scope.petTypes = res;
      }, err => {
        console.warn(err);
      });

    $scope.adoptMe = () => {
      Adopt.adoptNewPet($scope.newpet);
    };
  });
