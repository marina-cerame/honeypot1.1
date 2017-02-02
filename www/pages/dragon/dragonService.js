angular.module('dragon.service', ['app.dragon'])
  .factory('Dragon', function ($rootScope, $http, $ionicPopup) {
    const factory = {};

    factory.getStats = () => {
      return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
        .then(res => {
          stats = res.data.data[0];
          happiness = stats.happiness;
          stats.progress = (stats.goal_progress / stats.goal_amt);
          // setAccessories();
          // setHappiness();
          // setEvolution();
          // if (stats.accessories.necklace) {
          //   setClock();
          // }
          return stats;
        }, err => {
          console.warn(err);
        });
    };
    factory.showHelp = () => {
      $ionicPopup.alert({
        template: '<p>bars indicate pet status<br />when levels are low visit the store</p>',
      });
    };

/*
 * Function for Dead Dragon
 * Uncomment when animation etc is ready
*/
    // factory.deadDragon = () => {
    //   TweenMax.to('.dragon', 5, { x: 1200, ease: 'easeIn' })
    //   $ionicPopup.confirm({
    //     title: 'Your pet has run away in search of food!',
    //     template: 'click \'ok\' to lure your pet back with tasty bait ($5)',
    //   }).then(res => {
    //     if (res) {
    //       console.log('buy bait');
    //       $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
    //         .then((res) => {
    //           const transaction = {
    //             user_id: $rootScope.user,
    //             pet_id: $rootScope.pet.id,
    //             item_id: 29,
    //             amount: 500,
    //             checking: res.data.data[0].token,
    //             savings: res.data.data[1].token,
    //             pending: true,
    //           };
    //           console.log('transaction: ', transaction);
    //           $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
    //             .then((response) => {
    //               console.log('dead dragon transaction res: ', response);
    //               TweenMax.to('.dragon', 5, { x: 0, ease: 'easeIn' })
    //             });
    //         });
    //     } else {
    //       $location.path('/app/myPets');
    //     }
    //   });
    // };

    return factory;
  });
