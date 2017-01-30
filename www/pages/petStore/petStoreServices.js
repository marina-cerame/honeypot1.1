/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('store.service', ['app.store'])
  .factory('store', function ($location, $http, $rootScope, $ionicPopup, Pet) {
    const buyFood = function (context) {
      // $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
      //     .then(res => {
      //       const perc = res.data.data[0].goal_progress / res.data.data[0].goal_amt;
      //       const prog = res.data.data[0].goal_progress;
      //       const amt = res.data.data[0].goal_amt;
      //       if (perc < 0.5 && context.item.cost + prog >= amt / 2) {
      //         console.log('inside if statement in storeCon');
      //         Pet.evolve = true;
      //       }
      //     }, err => {
      //       console.warn(err);
      //     });
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
            .then((res) => {
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
