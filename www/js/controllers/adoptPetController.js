angular.module('app.adoptPet', [])

  .controller('adoptPetCtrl', function($scope, $http, $rootScope, $location) {

    $scope.selectedPet;
    $scope.newpet = {};
    $scope.petTypes = [];
    $scope.petImages = {
      1: '../img/pets/bear.png',
      2: '../img/pets/octopus.png',
      3: '../img/pets/dragon.png'
    };

    $scope.petTypeDisplay = function(type) {
      let types = {
        bear: 'fluffy bear',
        cat: 'sly octopus',
        dog: 'fiery dragon'
      };
      return types[type];
    };

    $scope.slideHasChanged = function(index) {
      $scope.selectedPet = $scope.petTypes[index];
    };

    $http.get('http://35.167.2.107:3000/v1/pet_types')
      .then(function(res) {
        res.data.data.forEach(type => {
          $scope.petTypes.push(type);
          for(let i = 0; i < $scope.petTypes.length; i++) {
            $scope.petTypes[i].img = $scope.petImages[$scope.petTypes[i].id];
            $scope.selectedPet = $scope.petTypes[0].name;
          }
        });
      }, function(err) {
        console.log(err);
      });

    $scope.adoptNewPet = function() {

      $scope.newpet.pet_type_id = $scope.selectedPet.id || 1;
      $scope.newpet.user_id = $rootScope.user;

      $http.post('http://35.167.2.107:3000/v1/pets', $scope.newpet)
        .then(function() {
          $location.path('/app/myPets');
        }, function(err) {
          console.log(err);
        });

    };

  });
