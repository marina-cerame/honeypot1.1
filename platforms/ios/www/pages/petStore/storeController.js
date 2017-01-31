/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.store', [])
.controller('StoreCtrl', function ($scope, $rootScope, $http, $location) {
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

  $scope.buyFood = function () {
    const context = this;
    $http.get(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.checking_id}`)
      .then((res) => {
        const transaction = {
          user_id: $rootScope.user,
          pet_id: $rootScope.pet.id,
          item_id: context.item.id,
          amount: context.item.cost,
          checking: res.data.data[0].token,
        };
        $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
          .then(() => {
            $location.path('/market/pet');
          }, (error) => {
            console.warn(error);
          });
      });
  };
});
