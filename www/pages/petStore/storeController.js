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

  $scope.images = {
    1: '/img/berries.png',
    2: '/img/salmon.png',
    3: '/img/honey_pot.png',
    10: '/img/wiz-hat.png',
    11: '/img/clock-chain.png',
    12: '/img/balloons.png',
    19: '/img/coffee.png',
    20: '/img/chips.png',
    21: '/img/klondike.png',
  };

  store.buyFood();

  $scope.showConfirm = function () {
    const confirmPopup = $ionicPopup.confirm({
      title: 'Confirm Transaction',
      template: 'Are you sure?',
    });

    confirmPopup.then(function (res) {
      if (res) {
        console.log('You are sure');
        store.buyFood();
      } else {
        console.log('You are not sure');
      }
    });
  };
});
