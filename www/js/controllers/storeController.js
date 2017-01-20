angular.module('app.store', [])

.controller('StoreCtrl', function($scope) {
  console.log($scope, 'heres scope in app store ctrl')
  $scope.test = 'Hello!'

  $scope.food = [
    { id: 1, name: 'Berries', price: '10 Bear Cents', hunger: '10pts', img: './img/berries.png'},
    { id: 2, name: 'Salmon', price: '19 Bear Cents', hunger: '20pts', img: '/img/salmon.png'},
    { id: 3, name: 'Honey!', price: '25 Bear Cents', hunger: '30pts', img: '/img/honey_pot.png'}
  ]



  $scope.color = function() {
    let color = '#';
    let hexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6']
    for(let i = 0; i < 6;i++){
      let string = hexes[Math.floor(Math.random() * hexes.length)];
      console.log(string)
      color += string;
    }
    return color;
  }

})
