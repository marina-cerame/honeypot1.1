/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.firstPet', [])
.controller('FirstPetCtrl', function ($scope, $location, $http, $rootScope) {
  $scope.pet = {};

  $scope.bearShrink = () => {
    TweenLite.to('.first-bear', 2, { scale: 0.75, x: '15%', y: '-40%' })
  };
  $scope.bearShrink();

  $scope.makeFirstPet = () => {
    $scope.pet.pet_type_id = 1;
    $scope.pet.user_id = $rootScope.user;
    $http.post('http://35.167.2.107:3000/v1/pets', $scope.pet)
      .then((res) => {
        $rootScope.pet = res.data.data[0];
        $location.path('/market/pet');
      }, (err) => {
        console.warn(err);
      });
  };
});
