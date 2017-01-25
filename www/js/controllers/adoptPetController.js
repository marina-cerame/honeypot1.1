angular.module('app.adoptPet', [])

  .controller('adoptPetCtrl', function($scope, $http, $rootScope, $location) {

    $scope.selectedPet;
    $scope.newpet = {};
    $scope.petTypes = [];
    $scope.petImages = {
      1: '../img/pets/bear.png',
      2: '../img/pets/octopus.png',
      3: '../img/pets/dragon.png'
    }

    $scope.slideHasChanged = function(index) {
      console.log(index)
      $scope.selectedPet = $scope.petTypes[index];
    }

    $http.get('http://localhost:3000/v1/pet_types')
      .then(function(res) {
        res.data.data.forEach(type => {
          $scope.petTypes.push(type)
          for(let i = 0; i < $scope.petTypes.length; i++) {
            console.log($scope.petTypes, 'pet types')
            $scope.petTypes[i].img = $scope.petImages[$scope.petTypes[i].id]
            $scope.selectedPet = $scope.petTypes[0].name;
          }
        });
      }, function(err) {
        console.log(err)
      })

    $scope.adoptNewPet = function() {

      $scope.newpet.pet_type_id = $scope.selectedPet.id || 1;
      $scope.newpet.user_id = $rootScope.user;
      console.log($scope.newpet, 'heres new pet')

      $http.post('http://localhost:3000/v1/pets', $scope.newpet)
        .then(function(res) {
          console.log(res)
        }, function(err) {
          console.log(err)
        })

    }

  })
