angular.module('myPets', [])
.controller('MyPetsCtrl', function($scope, $rootScope, $http, $location) {

  $http.get(`http://35.167.2.107:3000/v1/pets/?user_id__is=${$rootScope.user}`)
    .then(function(res) {
      $scope.pets = res.data.data;
    }, function(err) {
      console.log(err);
    });

  $scope.petImages = {
    1: '../img/pets/thumb-bear.png',
    2: '../img/pets/thumb-octopus.png',
    3: '../img/pets/thumb-dragon.png'
  };

  $scope.displayImages = function(type) {
    return $scope.petImages[type];
  };

  $scope.goToPet = function(pet) {
    $rootScope.pet = pet;
    $location.path('/market/pet');
  };

  $scope.editPet = function(pet) {
    $rootScope.pet = pet;
    $location.path('/app/editPet');
  }

})
