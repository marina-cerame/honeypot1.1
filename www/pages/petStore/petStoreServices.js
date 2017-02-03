/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('store.service', ['app.store'])
  .factory('store', function ($location, $http, $rootScope, $ionicPopup, Pet, Dragon, Octo) {
    const buyFood = function (context) {
      $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
          .then(res => {
            const perc = res.data.data[0].goal_progress / res.data.data[0].goal_amt / 100;
            const prog = res.data.data[0].goal_progress;
            const goal = res.data.data[0].goal_amt;
            const type = res.data.data[0].pet_type_id;
            if (perc < 0.5 && (context.item.cost / 100) + (prog / 100) >= goal / 2) {
              if (type === 1) {
                Pet.evolve = 1;
              }
              if (type === 2) {
                Octo.evolve = 1;
              }
              if (type === 3) {
                Dragon.evolve = 1;
              }
            } else if (perc < 1 && (context.item.cost / 100) + (prog / 100) >= goal) {
              if (type === 1) {
                Pet.evolve = 2;
              }
              if (type === 2) {
                Octo.evolve = 2;
              }
              if (type === 3) {
                Dragon.evolve = 2;
              }
            }
          }, err => {
            $ionicPopup.alert({
              title: err,
            });
          });
      $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
        .then(res => {
          const transaction = {
            user_id: $rootScope.user,
            pet_id: $rootScope.pet.id,
            item_id: context.item.id,
            amount: context.item.cost,
            checking: res.data.data[0].token,
            savings: res.data.data[1].token,
            pending: true,
          };
          $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
            .then(response => {
              const types = {
                1: 'pet',
                2: 'octopus',
                3: 'dragon',
              };
              const type = types[$rootScope.pet.pet_type_id];
              $location.path(`/market/${type}`);
            }, error => {
              $ionicPopup.alert({
                title: error,
              });
            });
        });
    };
    const showHelp = () => {
      $ionicPopup.alert({
        template: '<p>Purchase items to increase your pet&rsquo;s health & happiness.<br /><br />When your transactions reach $5, the money will transfer from your checking to savings account.</p>',
      });
    };
    return {
      buyFood,
      showHelp,
    };
  });
