angular.module('editPet', [])
.controller('editPetController', function($scope, $rootScope, $http, $location) {

  $scope.pet.name = $rootScope.pet.name;
  $scope.pet.goal_name = $rootScope.pet.goal_name;
  $scope.pet.goal_amt = $rootScope.pet.goal_amt;


  $scope.edit = function() {
    $http.put(`http://localhost:3000/v1/pets/${$rootScope.pet.id}`, $scope.pet)
      .then(function(res) {
        $location.path('/app/myPets');
      }, function(err) {
        console.log(err);
      })
  }
})
