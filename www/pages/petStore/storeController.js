/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.store', [])
.controller('StoreCtrl', function ($scope, $rootScope, $http, $location, $ionicPopup, store) {
  $scope.filters = { type: 'food' };

  $http.get(`http://localhost:3000/v1/items/?pet_type_id__is=${$rootScope.pet.pet_type_id}`)
    .then((res) => {
      $scope.items = res.data.data;
      $scope.items.map(item => {
        const price = (item.cost / 100)
        .toLocaleString('en-US',
          {
            style: 'currency',
            currency: 'USD',
          });
        item.price = price;
        return item;
      });
      console.log($scope.items, 'items here');
    }, (err) => {
      console.warn(err);
    });

  if ($rootScope.checking_id === undefined) {
    const bankFail = $ionicPopup.confirm({
      title: 'You must add your accounts before shopping',
    });
    bankFail.then((res) => {
      if (res) {
        $location.path('/app/account');
      } else {
        $location.path('/market/pet');
      }
    });
  }

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

  $scope.showHelp = () => store.showHelp();
});
