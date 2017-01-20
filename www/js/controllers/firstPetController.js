angular.module('app.firstPet', [])

  .controller('FirstPetCtrl', function($scope) {
    $scope.test = 'First Pet Hello!'

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
