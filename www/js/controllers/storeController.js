angular.module('app.store', [])
.controller('StoreCtrl', function($scope, $rootScope, $http , $location) {
  $scope.transaction;
  $scope.filters = {type:'food'};

  $http.get(`http://35.167.2.107:3000/v1/items/?pet_type_id__is=${$rootScope.pet.pet_type_id}`)
    .then(function(res) {
      $scope.items = res.data.data;
    }, function(err) {
      console.log(err);
    });

  $scope.effect = {
    food: 'Health',
    accessory: 'Happiness',
    treat: 'Happiness'
  };

  $scope.images = {
    1: '/img/berries.png',
    2: '/img/salmon.png',
    3: '/img/honey_pot.png',
    10: '/img/wiz-hat.png',
    11: '/img/balloons.png',
    12: '/img/clock-chain.png',
    19: '/img/coffee.png',
    20: '/img/chips.png',
    21: '/img/klondike.png'
  };

  $scope.buyFood = function() {
    $scope.transaction = {
      user_id: $rootScope.user,
      pet_id: $rootScope.pet.id,
      item_id: this.item.id,
      amount: this.item.cost
    };

    $http.post('http://localhost:3000/v1/transactions', $scope.transaction)
      .then(function(){
        $location.path('/market/pet');
      }, function(error){
        console.log(error);
      });
  };

});
