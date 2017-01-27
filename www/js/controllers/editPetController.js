/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('editPet', [])
.controller('editPetController', function ($scope, $rootScope, $http, $location) {
  $scope.pet.name = $rootScope.pet.name;
  $scope.pet.goal_name = $rootScope.pet.goal_name;
  $scope.pet.goal_amt = $rootScope.pet.goal_amt;


  $scope.edit = () => {
    $http.put(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`, $scope.pet)
      .then(() => {
        $location.path('/app/myPets');
      }, (err) => {
        console.warn(err);
      });
  };

  $scope.delete = () => {
    $http.delete(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`)
      .then(() => {
        $location.path('/app/myPets');
      }, (err) => {
        console.warn(err);
      });
  };
});
