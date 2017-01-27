/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('myPets', [])
.controller('MyPetsCtrl', function ($scope, $rootScope, $http, $location) {

  $http.get(`http://35.167.2.107:3000/v1/pets/?user_id__is=${$rootScope.user}`)
    .then((res) => {
      $scope.pets = res.data.data;
    }, (err) => {
      console.warn(err);
    });

  $scope.petImages = {
    1: '../img/pets/thumb-bear.png',
    2: '../img/pets/thumb-octopus.png',
    3: '../img/pets/thumb-dragon.png',
  };

  $scope.displayImages = (type) => $scope.petImages[type];

  $scope.goToPet = (pet) => {
    $rootScope.pet = pet;
    $location.path('/market/pet');
  };

  $scope.editPet = (pet) => {
    $rootScope.pet = pet;
    $location.path('/app/editPet');
  };
});
