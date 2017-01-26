angular.module('app.store', [])

.controller('StoreCtrl', function($scope, $rootScope, $http , $location) {
  $scope.transaction;

  $scope.food = [
    { id: 1, name: 'Berries', type: 'food', cost: '1', effect: '1', img: './img/berries.png'},
    { id: 2, name: 'Salmon', type: 'food', cost: '2', effect: '2', img: '/img/salmon.png'},
    { id: 3, name: 'Honey!', type: 'food', cost: '3', effect: '3', img: '/img/honey_pot.png'}
  ];

  $scope.buyFood = function() {

    $scope.transaction = {
      user_id: $rootScope.user,
      pet_id: $rootScope.pet.id,
      item_id: this.food.id,
      amount: this.food.cost
    };

    $http.post('http://localhost:3000/v1/transactions', $scope.transaction)
      .then(function(){
        $location.path('/market/pet');
      }, function(error){
        console.log(error);
      });
  };

});
