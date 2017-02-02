angular.module('octo.service', ['app.octo'])
  .factory('Octo', function ($rootScope, $http, $ionicPopup) {
    const factory = {};
    let stats = null;
    let happiness = null;

    factory.positionOct = () => {
      TweenMax.to('.octo', 0, { x: 90, y: 145, scale: 1.05 });
      TweenMax.to('.hat', 0, { x: -105, y: -30, scale: 1.5, rotation: -35,
        transformOrigin: '0% 100%' });
      TweenMax.to('.necklace', 0, { x: -65, y: 15, scale: 1.2 });
      TweenMax.to('.chain', 0, { scale: 1.4, transformOrigin: 'center' });
    //   TweenMax.to('.stringYellow', 0, { rotation: -5, transformOrigin: 'top' });
    //   TweenMax.to('.stringBlue', 0, { x: -39, y: -40, rotation: 19, transformOrigin: 'top' });
    //   TweenMax.to('.blueBal', 0, { x: -40, y: -40 });
    };

    let tear = 1;
    const normalTouch = () => {
      TweenMax.to('.t2', 1, { rotation: 30, transformOrigin: 'top right', delay: 0.5 });
      TweenMax.to('.t2', 1, { rotation: -0, transformOrigin: 'top right', delay: 1.5 });
      TweenMax.to('.t3', 1, { rotation: 30, transformOrigin: 'top right' });
      TweenMax.to('.t3', 1, { rotation: -0, transformOrigin: 'top right', delay: 1 });
      TweenMax.to('.t4', 1, { rotation: 30, transformOrigin: 'top right', delay: 0.5 });
      TweenMax.to('.t4', 1, { rotation: -0, transformOrigin: 'top right', delay: 1.5 });
      TweenMax.to('.t5', 1, { rotation: -30, transformOrigin: 'top left' });
      TweenMax.to('.t5', 1, { rotation: 0, transformOrigin: 'top left', delay: 1 });
      TweenMax.to('.t6', 1, { rotation: -30, transformOrigin: 'top left', delay: 0.5 });
      TweenMax.to('.t6', 1, { rotation: 0, transformOrigin: 'top left', delay: 1.5 });
      TweenMax.to('.t7', 1, { rotation: -30, transformOrigin: 'top left' });
      TweenMax.to('.t7', 1, { rotation: 0, transformOrigin: 'top left', delay: 1 });
      TweenMax.to('.t1t8', 1, { scale: 1.1, transformOrigin: 'center' });
      TweenMax.to('.t1t8', 1, { scale: 1, delay: 1, transformOrigin: 'center' });
      TweenMax.to('.suckers', 1, { scale: 1.1, transformOrigin: 'top' });
      TweenMax.to('.suckers', 1, { scale: 1, delay: 1, transformOrigin: 'top' });
      TweenMax.to('.tentacleBG', 1, { scale: 1.1, transformOrigin: 'center' });
      TweenMax.to('.tentacleBG', 1, { scale: 1, delay: 1, transformOrigin: 'center' });
      TweenMax.to('.eyebrows', 0.3, { y: -25, transformOrigin: 'center' });
      TweenMax.to('.eyebrows', 0.3, { y: 0, transformOrigin: 'center', delay: 0.3 });
      TweenMax.to('.eyebrows', 0.3, { y: -25, transformOrigin: 'center', delay: 0.6 });
      TweenMax.to('.eyebrows', 0.3, { y: 0, transformOrigin: 'center', delay: 0.9 });
      TweenMax.to('.blueBal', 1, { x: 20 });
      TweenMax.to('.stringBlue', 1, { x: 20 });
      TweenMax.to('.blueBal', 1, { x: 0, delay: 1 });
      TweenMax.to('.stringBlue', 1, { x: 0, delay: 1 });

      TweenMax.to('.redBal', 1, { x: -20 });
      TweenMax.to('.stringRed', 1, { x: -20 });
      TweenMax.to('.redBal', 1, { x: 0, y: 0, delay: 1 });
      TweenMax.to('.stringRed', 1, { x: 0, y: 0, delay: 1 });

      TweenMax.to('.yellowBal', 1, { x: 5, y: -95, delay: 0.5 });
      TweenMax.to('.stringYellow', 1, { x: 5, y: -95, delay: 0.5 });
      TweenMax.to('.yellowBal', 1, { x: 0, y: 0, delay: 1.5 });
      TweenMax.to('.stringYellow', 1, { x: 0, y: 0, delay: 1.5 });
    };

    const sadTouch = () => {
      TweenMax.to('.mouthBG', 1, { rotationX: 180, transformOrigin: 'center' });
      TweenMax.to('.teeth', 1, { rotationX: 180, transformOrigin: 'center' });
      TweenMax.to('.tongue', 1, { scale: 0.7, y: -6, transformOrigin: 'center' });
      TweenMax.to('.tongueLine', 1, { scale: 0.7, y: -6, transformOrigin: 'center' });
      TweenMax.to('.tentacles', 1, { scale: 0.75, transformOrigin: 'center' });
      TweenMax.to('.tentacleBG', 1, { scale: 0.75, transformOrigin: 'center' });
      TweenMax.to('.suckers', 1, { scale: 0.75, transformOrigin: '50% 20' });
      TweenMax.to('.body', 1, { scale: 0.9, transformOrigin: 'bottom' });
      TweenMax.to('.body', 1, { scaleX: 0.8, transformOrigin: 'bottom' });
      TweenMax.to('.tears', 1, { alpha: 1 });

      const tearSelect = tearNum => {
        TweenMax.to(tearNum, 4, { y: 30, ease: 'easeIn' });
        TweenMax.to(tearNum, 2, { alpha: 0, delay: 2 });
        TweenMax.to(tearNum, 0.001, { y: 0, alpha: 1, delay: 4 });
        tear++;
      };
      switch (tear) {
        case 1:
          tearSelect('.tear1');
          break;
        case 2:
          tearSelect('.tear2');
          break;
        case 3:
          tearSelect('.tear3');
          break;
        case 4:
          tearSelect('.tear4');
          break;
        case 5:
          tearSelect('.tear5');
          break;
        case 6:
          tearSelect('.tear6');
          break;
        case 7:
          tearSelect('.tear7');
          break;
        default:
          tearSelect('.tear8');
          tear = 1;
          break;
      }
    };
    factory.octoTouch = () => {
      console.log('octoTouch');
      const octo = $('.octo');
      if (happiness >= 25) {
        normalTouch();
      } else {
        sadTouch();
      }
      // TweenMax.to('.tears', 0, { x: -46  , y: 15 });
      // TweenMax.to('.t1t8', 1, { rotationX: '180_short', transformOrigin: 'center' });
      // TweenMax.to('.t1t8', 1, { rotationX: '0_short', transformOrigin: 'center', delay: 1 });
      // TweenMax.to('.t1t8', 1, { y: 100, transformOrigin: 'center' });
      // TweenMax.to('.t1t8', 1, { x: 238, transformOrigin: 'top' });
        // TweenMax.to('.body', 1, { scale: 1.1, transformOrigin: 'bottom' });
        // TweenMax.to('.body', 1, { scale: 1, delay: 1, transformOrigin: 'bottom' })
    };


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

    factory.deadOcto = () => {
      TweenMax.to('.octo', 5, { x: 1200, ease: 'easeIn' })
      $ionicPopup.confirm({
        title: 'Your pet has run away in search of food!',
        template: 'click \'ok\' to lure your pet back with tasty bait ($5)',
      }).then(res => {
        if (res) {
          console.log('buy bait');
          $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
            .then((res) => {
              const transaction = {
                user_id: $rootScope.user,
                pet_id: $rootScope.pet.id,
                item_id: 29,
                amount: 500,
                checking: res.data.data[0].token,
                savings: res.data.data[1].token,
                pending: true,
              };
              console.log('transaction: ', transaction);
              $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
                .then((response) => {
                  console.log('dead octo transaction res: ', response);
                  TweenMax.to('.octo', 5, { x: 0, ease: 'easeIn' })
                });
            });
        } else {
          $location.path('/app/myPets');
        }
      });
    };


    return factory;
  });
