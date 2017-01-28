/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('store.service', ['app.store'])
  .factory('store', function ($location, $http, $rootScope) {
    const buyFood = function () {
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
    return {
      buyFood,
    };
  });
