/* globals angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.adoptPet', [])

  .controller('adoptPetCtrl', function ($scope, $http, $rootScope, $location, Adopt) {
    $scope.newpet = {};
    $scope.newpet.pet_type_id = 1;
    console.log($scope.newpet.pet_type_id, 'pet type id')

    $scope.$on('$ionicSlides.slideChangeStart', (event, data) => {
      $scope.newpet.pet_type_id = data.slider.activeIndex + 1 || 1;
      console.log($scope.newpet.pet_type_id, 'pet type id')
    });

    Adopt.getPets()
      .then(res => {
        $scope.petTypes = res;
      }, err => {
        console.warn(err);
      });

    $scope.adoptMe = () => {
      Adopt.adoptNewPet($scope.newpet);
      $scope.newpet = {};
    };

    $scope.showHelp = () => Adopt.showHelp();
  });
