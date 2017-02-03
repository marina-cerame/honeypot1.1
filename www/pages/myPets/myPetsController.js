/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('myPets', [])
.controller('MyPetsCtrl', function ($scope, $rootScope, $http, $location, myPets) {
  myPets.getAll()
    .then((pets) => {
      $scope.pets = pets;
      $scope.pets.forEach((pet) => {
        if (pet.goal_progress / pet.goal_amt >= 100) {
          pet.hunger = 100;
          pet.happiness = 100;
        }
      });
    });

  $scope.fontColor = index => {
    if (index < 30) {
      return '#BC1616';
    }
    if (index > 30 && index < 60) {
      return '#E3B11A';
    }
    return '#4FA31B';
  };

  $scope.petImages = {
    1: 'https://res.cloudinary.com/bearquarium/image/upload/v1486141525/teddyBearexport_tllo24.png',
    2: 'https://res.cloudinary.com/bearquarium/image/upload/v1486141431/octypoo_ileib2.png',
    3: 'https://res.cloudinary.com/bearquarium/image/upload/v1486141439/draggykinsforexport_sxljdp.png',
  };

  $scope.showHelp = () => { myPets.showHelp(); };

  $scope.displayImages = type => $scope.petImages[type];

  $scope.goToPet = pet => {
    $rootScope.pet = pet;
    const type = myPets.pets[pet.pet_type_id];
    $location.path(`/market/${type}`);
  };

  $scope.editPet = pet => {
    $rootScope.pet = pet;
    $location.path('/app/editPet');
  };
});
