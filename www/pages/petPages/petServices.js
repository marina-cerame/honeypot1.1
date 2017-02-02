angular.module('pet.service', ['app.pet'])
.factory('Pet', function ($rootScope, $http, $ionicPopup, $location) {
  const factory = {};
  let stats = null;
  let happiness = null;

  // ///////////////////////////////
  // //////// Happiness ////////////
  // ///////////////////////////////
  factory.bearTilt = () => {
    TweenMax.to('.bear', 1, {
      rotation: 2,
      transformOrigin: '65% 80%',
    });
    TweenMax.to('.balloons', 1, {
      rotation: -2,
      transformOrigin: 'bottom',
    });
    TweenMax.to('.bear', 1, {
      rotation: -2,
      transformOrigin: '65% 80%',
      delay: 1,
      onComplete: factory.bearTilt,
    });
    TweenMax.to('.balloons', 1, {
      rotation: 2,
      transformOrigin: 'bottom',
      delay: 1,
    });
  };

  const setHappiness = () => {
    if (happiness > 50) {
      bearTilt();
    }
    if (happiness < 51) {
      TweenMax.to('.mouth', 0, { alpha: 0 });
      TweenMax.to('.frown', 0, { alpha: 1 });
      if (happiness < 26) {
        TweenMax.to('.tears', 2, { alpha: 0.7 });
      }
    }
  };

  // /////////////////////////////////////
  // //////BEAR TOUCH EFFECT//////////////
  // /////////////////////////////////////
  const bearWave = () => {
    TweenMax.to('.ears', 0.7, { y: -8 });
    TweenMax.to('.armLeft', 0.7, { rotation: 65, x: -10, transformOrigin: '80% 50%' });
    TweenMax.to('.balloons', 0.7, { y: -77, x: 0 });

    TweenMax.to('.ears', 0.7, { y: 0, delay: 0.7 });
    TweenMax.to('.armLeft', 0.7, { rotation: 0, x: 0, transformOrigin: '80% 50%', delay: 0.7 });
    TweenMax.to('.balloons', 0.7, { y: 0, x: 0, delay: 0.7 });
  };

  let tear = 1;
  let drip = 1;
  factory.bearTouch = () => {
    // IF BEAR IS HAPPY

    if (happiness > 25 || stats.progress >= 100) {
      console.log(stats.progress);
      bearWave();
      const blood = '.blood' + drip;
      TweenMax.to(blood, 3, { y: 75, ease: 'easeIn' });
      TweenMax.to(blood, 1.5, { alpha: 0, delay: 1.5 });
      TweenMax.to(blood, 0, { y: 0, delay: 3 });
      TweenMax.to(blood, 2, { alpha: 1, delay: 3 });
      if (drip === 4) {
        drip = 0;
      }
      drip++;
    } else {
      // IF BEAR IS SAD
      const tearSelect = function (tearNum) {
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
          tear = 1;
          break;
      }
      if (tear % 4 === 1) {
        TweenMax.to('.redBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringRed', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringRed', 2, {
          rotation: '5_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 6 === 1) {
        TweenMax.to('.yellowBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringYellow', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringYellow', 2, {
          rotation: '-10_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 8 === 1) {
        TweenMax.to('.blueBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringBlue', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.stringBlue', 2, { rotation: '20_short',
        transformOrigin: '0% 0%',
        ease: 'easeIn',
      });
      }
    }
  };

  // ////////////////////////////
  // ////// ACCESSORIES /////////
  // ////////////////////////////
  const setAccessories = () => {
    const accessories = stats.accessories;
    const hat = accessories.hat;
    const necklace = accessories.necklace;
    const balloons = accessories.balloons;
    if (hat) {
      TweenMax.fromTo('.hat', 2, { alpha: 0, y: -150 }, { alpha: 1, y: 0 });
    }
    if (balloons) {
      TweenMax.to('.balloons', 0, { alpha: 1 });
    }
    if (necklace) {
      TweenMax.to('.necklace', 0, { alpha: 1 });
    }
  };

  // ////////////////////////////
  // ///// CLOCK FUNCTIONS///////
  // ////////////////////////////
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

      TweenMax.to('.hourHand', 1, { rotation: `${hour}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.minuteHand', 1, { rotation: `${minute}_short`, transformOrigin: 'bottom' });
      TweenMax.to('.secondHand', 1, { rotation: `${second}_short`, transformOrigin: 'bottom' });
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
      $('.ground').css('background-image', 'url(./img/woods_day.png)');
    } else {
      $('.ground').css('background-image', 'url(./img/woods_night.png)');
    }
  };

  // //////////////////////////////
  // //////// EVOLUTION ///////////
  // //////////////////////////////

  factory.evolve = false; //  << this gets set to false initially but may be changed by store
                          //     controller which triggers the evolution animation
  const setEvolution = () => {
    if (stats.progress > 50) {
      TweenMax.to('.tusks', 0, { alpha: 1 });
      TweenMax.to('.claws', 0, { alpha: 1 });
    }
    if (stats.progress >= 100 && !factory.evolve) {
      TweenMax.to('.claws', 0, { fill: '#830303' });
      TweenMax.to('.tusks', 0, { fill: '#830303' });
      TweenMax.to('.body', 0, { fill: '#DAA520' });
      TweenMax.to('.leftArm', 0, { fill: '#DAA520' });
      TweenMax.to('.rightArm', 0, { fill: '#DAA520' });
      TweenMax.to('.head', 0, { fill: '#DAA520' });
      TweenMax.to('.leftFoot', 0, { fill: '#DAA520' });
      TweenMax.to('.rightFoot', 0, { fill: '#DAA520' });
      TweenMax.to('.outerEar', 0, { fill: '#DAA520' });
      TweenMax.to('.blood', 0, { alpha: 1 });
    }
  };

  const evolution1 = () => {
    TweenMax.fromTo('.tusks', 2.5, { alpha: 1, scale: 0, transformOrigin: 'top' },
      { scale: 1.2, transformOrigin: 'top', delay: 1 });
    TweenMax.fromTo('.rightClaw', 3, { alpha: 1, scale: 0, transformOrigin: 'top left' },
      { scale: 1.4, transformOrigin: 'top left', delay: 1 });
    TweenMax.fromTo('.leftClaw', 3, { alpha: 1, scale: 0, transformOrigin: 'top right' },
      { scale: 1.4, transformOrigin: 'top right', delay: 1 });
  };

  const evolution2 = () => {
    TweenMax.to('.claws', 4, { fill: '#830303', delay: 2 });
    TweenMax.to('.tusks', 4, { fill: '#830303', delay: 2 });
    TweenMax.to('.body', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.leftArm', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.rightArm', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.head', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.leftFoot', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.rightFoot', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.outerEar', 4, { fill: '#DAA520', delay: 2 });
    TweenMax.to('.blood', 4, { alpha: 1, delay: 2 });
  };

  const evoAnimation = evolution => {
    factory.evolve = false;
    const tl = new TimelineMax();
    tl.to('.bear', 3, {
      transformOrigin: '50% 50%',
      y: -250,
      ease: Circ.easeOut,
    }, 'bounce')

    /* bear bounce down */
    .to('.bear', 0.4, {
      transformOrigin: '50% 50%',
      y: 35,
      ease: Circ.easeIn,
      delay: 0.6,
    }, 'bounce2')
    /* bear squash */
    .to('.bear', 0.2, {
      transformOrigin: '50% 100%',
      scaleX: 1.2,
      scaleY: 0.8,
      ease: Power1.easeInOut,
    }, 'bounce3-=0.04')
    .to('.bear', 0.2, {
      transformOrigin: '50% 100%',
      scaleX: 1.1,
      scaleY: 1.1,
      ease: Power1.easeInOut,
    });
    evolution();
  };

  // ////////////////////
  // /////Get Req////////
  // ////////////////////
  factory.getStats = () => {
    return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
      .then(res => {
        stats = res.data.data[0];
        happiness = stats.happiness;
        stats.progress = (stats.goal_progress / stats.goal_amt);
        setAccessories();
        setHappiness();
        setEvolution();
        if (factory.evolve === 1) {
          evoAnimation(evolution1);
          /* bear bounce up */
        }
        if (factory.evolve === 2) {
          evoAnimation(evolution2);
        }
        if (stats.accessories.necklace) {
          setClock();
        }
        return stats;
      }, err => {
        console.warn(err);
      });
  };

  // /////////////////////////////////////////////////////
  // ///////Initial Function to Fix Bear Size/////////////
  // /////////////////////////////////////////////////////
  factory.bearGrow = () => {
    TweenMax.to('.bear', 0, { scale: 1.15, y: 130 });
  };

  factory.showHelp = () => {
    $ionicPopup.alert({
      template: '<p>bars indicate pet status<br />when levels are low visit the store</p>',
    });
  };

  factory.deadBear = () => {
    TweenMax.to('.bear', 5, { x: 1200, ease: 'easeIn' })
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
              item_id: 28,
              amount: 500,
              checking: res.data.data[0].token,
              savings: res.data.data[1].token,
              pending: true,
            };
            console.log('transaction: ', transaction);
            $http.post('http://35.167.2.107:3000/v1/transactions', transaction)
              .then((response) => {
                console.log('dead bear transaction res: ', response);
                TweenMax.to('.bear', 5, { x: 0, ease: 'easeIn' })
              });
          });
      } else {
        $location.path('/app/myPets');
      }
    });
  };

  return factory;
});
