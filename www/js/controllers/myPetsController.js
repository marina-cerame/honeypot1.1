angular.module('myPets', [])
.controller('MyPetsCtrl', function($scope, $rootScope, $http, $location) {

  $http.get(`http://localhost:3000/v1/pets/?user_id__is=${$rootScope.user}`)
    .then(function(res) {
      $scope.pets = res.data.data;
    }, function(err) {
      console.log(err);
    })

  $scope.petImages = {
    1: '../img/pets/bear.png',
    2: '../img/pets/octopus.png',
    3: '../img/pets/dragon.png'
  };

  $scope.displayImages = function(type) {
    return petImages[type]
  }
  $scope.goToPet = function(pet) {
    $rootScope.pet = pet;
    $location.path('/market/pet');
  }

  $scope.editPet = function(pet) {
    $rootScope.pet = pet;
    $location.path('/app/editPet');
  }

})
