angular.module('app.store', [])

.controller('StoreCtrl', function($scope, $rootScope, $http , $location) {
  console.log($scope, 'heres scope in app store ctrl')
  $scope.test = 'Hello!'
  $scope.transaction;

  $scope.food = [
    { id: 1, name: 'Berries', type: 'food', cost: '50', effect: '1', img: './img/berries.png'},
    { id: 2, name: 'Salmon', type: 'food', cost: '75', effect: '2', img: '/img/salmon.png'},
    { id: 3, name: 'Honey!', type: 'food', cost: '100', effect: '3', img: '/img/honey_pot.png'}
  ]

  $scope.buyFood = function() {
    const context = this;




    $http.get(`http://localhost:3000/v1/bank_tokens/${$rootScope.checking_id}`)
      .then(function(res) {
        console.log('res: ', res);
        let transaction = {
          user_id: $rootScope.user,
          pet_id: $rootScope.pet.id,
          item_id: context.food.id,
          amount: context.food.cost,
          checking: res.data.data[0].token
        };

        console.log(transaction, 'heres transaction')

        $http.post('http://localhost:3000/v1/transactions', transaction)
          .then(function(res){
            $location.path('/market/pet')

          }, function(error){
            console.log(error);
          })

        // $http.post('http://localhost:8080/charge', stripeInfo)
        //   .then(function(res) {
        //     console.log('hell?', res);
        //   }, function(err) {
        //     console.log('o,', err);
        //   });
      })

  }

})


// $scope.color = function() {
//   let color = '#';
//   let hexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6']
//   for(let i = 0; i < 6;i++){
//     let string = hexes[Math.floor(Math.random() * hexes.length)];
//     console.log(string)
//     color += string;
//   }
//   return color;
// }
