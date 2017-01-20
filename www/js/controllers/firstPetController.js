angular.module('app.firstPet', [])

  .controller('FirstPetCtrl', function($scope, $location, $http, $rootScope) {
    $scope.pet = {};

    $scope.makeFirstPet = function() {

      $scope.pet.pet_type_id = 1;
      $scope.pet.goal_amt = $scope.pet.goal_amt.slice(1);
      $scope.pet.user_id = $rootScope.user;
      console.log($scope.pet);
      $http.post('http://localhost:3000/v1/pets', $scope.pet)
        .then(function(res) {
          $rootScope.pet = $scope.pet;
          $location.path('/app/pet');
        }, function(err) {
          console.log(err);
        });
    };

    $scope.goal_amt = [
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      1000
    ]
  })


  // let petTypes = [
  //   null,
  //   'Starter Bear'
  // ]
  //
  // let animal = $scope.pet.pet_type_id;
