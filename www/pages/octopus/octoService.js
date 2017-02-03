/* globals TweenMax angular */

angular.module('octo.service', ['app.octo'])
  .factory('Octo', function ($rootScope, $http, $ionicPopup, $location) {
    const factory = {};
    let stats = null;
    let happiness = null;

    factory.positionOct = () => {
      TweenMax.to('.octo', 0, { x: 90, y: 145, scale: 1.05 });
      TweenMax.to('.octo-hat', 0, { x: -55, scale: 0.9, rotation: -25,
        transformOrigin: '0% 100%' });
      TweenMax.to('.octo-necklace', 0, { x: -65, y: 15, scale: 1.2 });
      TweenMax.to('.chain', 0, { scale: 1.4, transformOrigin: 'center' });
      TweenMax.to('.tears', 0, { x: -46, y: 15 });
    };

    let tear = 1;
    const normalTouch = () => {
      TweenMax.to('.teeth', 5, { rotationX: 180, transformOrigin: 'center' });
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
      if (happiness > 25) {
        normalTouch();
      } else {
        sadTouch();
      }
    };

    const setHappiness = () => {
      if (happiness <= 25) {
        TweenMax.to('.tears', 0, { alpha: 1 });
        TweenMax.to('.mouthBG', 0, { rotation: 180, transformOrigin: '50% 50%' });
        TweenMax.to('.teeth', 0, { rotation: 180, transformOrigin: '50% 50%' });
        TweenMax.to('.tongue', 0, { scale: 0.7, y: -6, transformOrigin: 'center' });
        TweenMax.to('.tongueLine', 0, { scale: 0.7, y: -6, transformOrigin: 'center' });
      }
    };

    Date.prototype.timeNow = function () {
      // WTF is this???
      return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':'
      + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':'
      + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
    };

    const newDate1 = new Date();
    const setClock = () => {
      setInterval(() => {
        const newDate = new Date();
        const datetime = newDate.timeNow();
        let second = datetime.slice(6, 8) * 360 / 60;
        let minute = datetime.slice(3, 5) * 360 / 60;
        let hour = datetime.slice(0, 2) * 360 / 12 + (minute / 12);
        if (hour === 360) {
          hour = 0;
        }
        if (minute === 360) {
          minute = 0;
        }
        if (second === 360) {
          second = 0;
        }

        TweenMax.to('.octo-hourHand', 1, { rotation: `${hour}_short`, transformOrigin: 'bottom' });
        TweenMax.to('.octo-minuteHand', 1, { rotation: `${minute}_short`, transformOrigin: 'bottom' });
        TweenMax.to('.octo-secondHand', 1, { rotation: `${second}_short`, transformOrigin: 'bottom' });
      }, 1000);
    };
    // ////////////////////////////////
    // /////////Day & Night////////////
    // ////////////////////////////////
    factory.setBackground = () => {
      const datetime1 = newDate1.timeNow();
      const minute1 = datetime1.slice(3, 5) * 360 / 60;
      const hour1 = datetime1.slice(0, 2) * 360 / 12 + (minute1 / 12);
      if (hour1 > 180 && hour1 < 540) {
        $('.octo-ground').css('background-image', 'url(https://res.cloudinary.com/bearquarium/image/upload/v1485818261/water_day_btsnlg.png)');
      } else {
        $('.octo-ground').css('background-image', 'url(https://res.cloudinary.com/bearquarium/image/upload/v1485818265/water_night_rdhfhl.png)');
      }
    };

    const setAccessories = () => {
      const accessories = stats.accessories;
      const hat = accessories.hat;
      const necklace = accessories.necklace;
      const balloons = accessories.balloons;
      if (hat) {
        TweenMax.fromTo('.octo-hat', 2, { alpha: 0, y: -220 }, { alpha: 1, y: -90 });
      }
      if (necklace) {
        setClock();
        TweenMax.to('.octo-necklace', 0, { alpha: 1 });
      }
      if (balloons) {
        TweenMax.to('.octo-balloons', 0, { alpha: 1 });
      }
    };

    factory.evolve = false; //  << this gets set to false initially but may be changed by store
                            //     controller which triggers the evolution animation
    const setEvolution = () => {
      if (stats.progress > 50) {
        TweenMax.to('.t4', 0, { alpha: 1 });
        TweenMax.to('.t5', 0, { alpha: 1 });
      }
      if (stats.progress >= 100 && !factory.evolve) {
        TweenMax.to('.t2', 0, { alpha: 1 });
        TweenMax.to('.t7', 0, { alpha: 1 });
      }
    };

    const evolution1 = () => {
      TweenMax.fromTo('.t4', 3, {
        x: 25,
        alpha: 1,
        scale: 0,
        rotation: -45,
        transformOrigin: 'bottom right',
      },
        {
          x: 5,
          scale: 1,
          rotation: 0,
          transformOrigin: 'bottom right',
        });
      TweenMax.fromTo('.t5', 3, {
        x: -25,
        alpha: 1,
        scale: 0,
        rotation: 45,
        transformOrigin: 'bottom left',
      },
        {
          x: 0,
          scale: 1,
          rotation: 0,
          transformOrigin: 'bottom left',
        });
    };

    const evolution2 = () => {
      TweenMax.fromTo('.t2', 3, {
        x: 25,
        alpha: 1,
        scale: 0,
        rotation: -45,
        transformOrigin: 'bottom right',
      },
        {
          x: 5,
          scale: 1,
          rotation: 0,
          transformOrigin: 'bottom right',
        });
      TweenMax.fromTo('.t7', 3, {
        x: -25,
        alpha: 1,
        scale: 0,
        rotation:
        45,
        transformOrigin: 'bottom left',
      },
        {
          x: 0,
          scale: 1,
          rotation: 0,
          transformOrigin: 'bottom left',
        });
    };

    const evoAnimation = evolution => {
      factory.evolve = false;
      const tl = new TimelineMax();
      tl.to('.octo', 3, {
        transformOrigin: '50% 50%',
        y: -100,
        ease: Circ.easeOut,
      }, 'bounce')

      /* octo bounce down */
      .to('.octo', 0.4, {
        transformOrigin: '50% 50%',
        y: 145,
        ease: Circ.easeIn,
        delay: 0.6,
      }, 'bounce2')
      /* octo squash */
      .to('.octo', 0.2, {
        transformOrigin: '50% 100%',
        scaleX: 1.2,
        scaleY: 0.8,
        ease: Power1.easeInOut,
      }, 'bounce3-=0.04')
      .to('.octo', 0.2, {
        transformOrigin: '50% 100%',
        scaleX: 1,
        scaleY: 1,
        ease: Power1.easeInOut,
      });
      evolution();
    };

    factory.getStats = () => {
      return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
        .then(res => {
          stats = res.data.data[0];
          happiness = stats.happiness;
          stats.progress = (stats.goal_progress / stats.goal_amt);
          if (factory.evolve === 1) {
            evoAnimation(evolution1);
            /* bear bounce up */
          }
          if (factory.evolve === 2) {
            evoAnimation(evolution2);
          }
          setAccessories();
          setHappiness();
          setEvolution();
          return stats;
        }, err => {
          $ionicPopup.alert({
            title: err,
          });
        });
    };

    factory.showHelp = () => {
      $ionicPopup.alert({
        template: '<p>bars indicate pet status<br />when levels are low visit the store</p>',
      });
    };

    factory.deadOcto = () => {
      TweenMax.to('.octo', 5, { x: 1200, ease: 'easeIn' });
      $ionicPopup.confirm({
        title: 'Your pet has run away in search of food!',
        template: 'click \'ok\' to lure your pet back with tasty bait ($5)',
      }).then(res => {
        if (res) {
          $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
            .then(res => {
              const transaction = {
                user_id: $rootScope.user,
                pet_id: $rootScope.pet.id,
                item_id: 28,
                amount: 500,
                checking: res.data.data[0].token,
                savings: res.data.data[1].token,
                pending: true,
              };
              $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
                .then(response => {
                  TweenMax.to('.octo', 5, { x: 90, ease: 'easeIn' });
                });
            });
        } else {
          $location.path('/app/myPets');
        }
      });
    };


    factory.showHelp = () => {
      $ionicPopup.alert({
        template: '<p>bars indicate pet status<br />when levels are low visit the store</p>',
      });
    };
    return factory;
  });
