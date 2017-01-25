angular.module('app.firstPet', [])

  .controller('FirstPetCtrl', function($scope, $location, $http, $rootScope) {
    $scope.pet = {};
    $scope.testRes;

    $scope.bearShrink = function() {
      TweenLite.to('.first-bear', 2, { scale: 0.75, x: '15%', y: '-40%'  })
    }
    $scope.bearShrink();

    $scope.makeFirstPet = function() {

      $scope.pet.pet_type_id = 1;
      $scope.pet.user_id = $rootScope.user;
      // console.log($scope.pet, 'heres scope pet');
      $http.post('http://localhost:3000/v1/pets', $scope.pet)
        .then(function(res) {
          $rootScope.pet = res.data.data[0];
          $location.path('/market/pet');
        }, function(err) {
          console.log(err);
        });
        console.log($scope.testRes)
    };

    $scope.goal_amt = [
      1000,
      900,
      800,
      700,
      600,
      500,
      400,
      300,
      200,
      100
    ]
  })


  // let petTypes = [
  //   null,
  //   'Starter Bear'
  // ]
  //
  // let animal = $scope.pet.pet_type_id;
