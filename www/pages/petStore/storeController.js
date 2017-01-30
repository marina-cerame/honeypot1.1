/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.store', [])
.controller('StoreCtrl', function ($scope, $rootScope, $http, $location, $ionicPopup, store) {
  $scope.filters = { type: 'food' };

  $http.get(`http://35.167.2.107:3000/v1/items/?pet_type_id__is=${$rootScope.pet.pet_type_id}`)
    .then((res) => {
      $scope.items = res.data.data;
    }, (err) => {
      console.warn(err);
    });

  $scope.effect = {
    food: 'Health',
    accessory: 'Happiness',
    treat: 'Happiness',
  };

  $scope.showConfirm = function () {
    const confirmPopup = $ionicPopup.confirm({
      title: 'Confirm Transaction',
      template: 'Are you sure?',
    });
    const context = this;
    confirmPopup.then(function (res) {
      if (res) {
        store.buyFood(context);
      }
    });
  };
});
