/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('editPet', [])
.controller('editPetController', function ($scope, $rootScope, $http, $location, editPet) {
  $scope.pet.name = $rootScope.pet.name;
  $scope.pet.goal_name = $rootScope.pet.goal_name;
  $scope.pet.goal_amt = $rootScope.pet.goal_amt;
  const pet = $scope.pet;

  $scope.edit = () => editPet.edit(pet);

  $scope.delete = () => editPet.deleter();
});
