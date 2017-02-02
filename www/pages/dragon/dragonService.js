angular.module('dragon.service', ['app.dragon'])
  .factory('Dragon', function ($rootScope, $http, $ionicPopup) {
    const factory = {};
    let stats = null;
    let happiness = null;

    factory.dragTilt = () => {
      TweenMax.to('.all-drag', 1, {
        rotation: 2,
        transformOrigin: '50% 50%',
      });
      TweenMax.to('.all-drag', 1, {
        rotation: -2,
        transformOrigin: '50% 50%',
        delay: 1,
        onComplete: factory.dragTilt,
      });
    };

    const setTears = () => {
      TweenMax.to('.dragon-tear1', 0, { x: -55, y: -105 });
      TweenMax.to('.dragon-tear2', 0, { x: -55, y: -105, alpha: 1 });
      TweenMax.to('.dragon-tear3', 0, { x: -5, y: -100, alpha: 1 });
      TweenMax.to('.dragon-tear4', 0, { x: -5, y: -100 });
    };

    const browsDown = () => {
      TweenMax.to('.eyebrows', 1, {
        y: 4,
        scale: 1.1,
      });
    };
    const mouthSad = () => {
      TweenMax.to('.upper-mouth', 1, {
        y: 6,
        scale: 1.1,
      });
    };

    const setHappiness = () => {
      if (happiness < 51) {
        browsDown();
        mouthSad();
        if (happiness < 26) {
          TweenMax.to('.dragon-tears', 2, { alpha: 0.7 });
        }
      }
    };

    const setAccessories = () => {
      const accessories = stats.accessories;
      const hat = accessories.hat;
      const necklace = accessories.necklace;
      const balloons = accessories.balloons;
      if (hat) {
        TweenMax.to('.dragon-hat', 0, { scale: 0.5, x: 20, y: 65, alpha: 1 });
      }
      if (balloons) {
        TweenMax.to('.dragon-balloons', 2, { alpha: 1 });
      }
      if (necklace) {
        TweenMax.to('.dragon-necklace', 2, { alpha: 1 });
      }
    };

    const mouthOpen = () => {
      TweenMax.to('.tongue', 0, {
        transformOrigin: 'bottom',
        scaleY: 6,
      });
      TweenMax.to('.tongue', 4, {
        transformOrigin: 'bottom',
        scaleY: 1,
      });
      TweenMax.to('.mouth-open', 2, {
        scaleY: 1.5,
      });
      TweenMax.to('.mouth-open', 2, {
        delay: 1,
        scaleY: 1,
      });
    };

    const showWings = () => {
      TweenMax.to('.left-wing-whole', 0, {
        opacity: 1,
      });
      TweenMax.to('.right-wing-whole', 0, {
        opacity: 1,
      });
    };

    const breatheFire = () => {
      const tl = new TimelineMax();
      const tl2 = new TimelineMax();

      const flameDie = () => {
        tl2.to('.flame-1', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-2', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-3', 2, { opacity: 0 }, '-=1.8')
         .to('.close-flame', 2, { opacity: 0 }, '-=1.8')
         .to('.mid-flame', 2, { opacity: 0 }, '-=1.8')
         .to('.far-flame', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-4', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-5', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-6', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-7', 2, { opacity: 0 }, '-=1.8')
         .to('.flame-8', 2, { opacity: 0 }, '-=1.8');
      };

      tl.to('.flame-1', 0.4, { opacity: 1, ease: 'easeIn' }, '-=0.25')
        .to('.flame-2', 0.4, { opacity: 1, ease: 'easeIn' }, '-=0.25')
        .to('.flame-3', 0.4, { opacity: 1, ease: 'easeIn', onComplete: flameDie }, '-=0.25')
        .to('.flame-4', 0.4, { opacity: 1 }, '-=0.25')
        .to('.flame-5', 0.4, { opacity: 1 }, '-=0.25')
        .to('.close-flame', 0.4, { opacity: 1 }, '-=0.25')
        .to('.flame-6', 0.4, { opacity: 1 }, '-=0.25')
        .to('.flame-7', 0.4, { opacity: 1 }, '-=0.25')
        .to('.mid-flame', 0.4, { opacity: 1 }, '-=0.25')
        .to('.flame-8', 0.4, { opacity: 1 }, '-=0.25')
        .to('.far-flame', 0.4, { opacity: 1 }, '-=0.25');
    };


    const tailSwing = () => {
      TweenMax.to('.whole-tail', 2, {
        rotationX: 180,
        scale: 0.8,
        transformOrigin: '100% 50%',
      });
      TweenMax.to('.dragon-balloons', 2, {
        rotationX: 180,
        scale: 0.8,
        transformOrigin: '100% 50%',
      });
      TweenMax.to('.dragon-balloons', 2, {
        delay: 0.75,
        scale: 1,
        rotationX: 0,
      });
      TweenMax.to('.whole-tail', 2, {
        delay: 0.75,
        scale: 1,
        rotationX: 0,
        onComplete: tailSwing,
      });
    };

    factory.flapWings = () => {
      const flapRight = () => {
        TweenMax.to('.left-wing-whole', 0.75, {
          rotationX: 180,
          scaleX: 0.4,
          transformOrigin: '100% 90%',
        });
        TweenMax.to('.left-wing-whole', 0.75, {
          rotationX: 0,
          scaleX: 1,
          z: 0,
          delay: 0.75,
          onComplete: flapRight,
        });
      };

      const flapLeft = () => {
        TweenMax.to('.right-wing-whole', 0.75, {
          rotationX: 180,
          scaleX: 0.4,
          transformOrigin: '10% 90%',
        });
        TweenMax.to('.right-wing-whole', 0.75, {
          rotationX: 0,
          scaleX: 1,
          z: 0,
          delay: 0.75,
          onComplete: flapLeft,
        });
      };
      flapRight();
      flapLeft();
    };

    let i = 0;
    const flapCheck = () => {
      if (i < 10) {
        flapEars();
      } else {
        i = 0;
      }
    };

    const flapEars = () => {
      TweenMax.to('.left-ear', 0.09, {
        rotationX: 180,
        scaleX: 0.4,
        transformOrigin: '100% 90%',
      });
      TweenMax.to('.left-ear', 0.09, {
        rotationX: 0,
        scaleX: 1,
        z: 0,
        delay: 0.09,
      });
      TweenMax.to('.right-ear', 0.09, {
        rotationX: 180,
        scaleX: 0.4,
        transformOrigin: '10% 90%',
      });
      TweenMax.to('.right-ear', 0.09, {
        rotationX: 0,
        scaleX: 1,
        z: 0,
        delay: 0.09,
        onComplete: flapCheck,
      });
      i++;
    };

    const browRaise = () => {
      TweenMax.to('.eyebrows', 1, {
        y: -8,
        scale: 1.1,
      });
      TweenMax.to('.eyebrows', 1, {
        delay: 1,
        y: 0,
        scale: 1,
      });
    };

    let tear = 1;

    const dragonCry = () => {
      if (tear % 2 === 1) {
        TweenMax.to('.dragon-tear3', 4, { y: 30, ease: 'easeIn' });
        TweenMax.to('.dragon-tear3', 2, { alpha: 0, delay: 2 });
        TweenMax.to('.dragon-tear3', 0.001, { y: 0, alpha: 0, delay: 4 });
        tear++;
      } else {
        TweenMax.to('.dragon-tear2', 4, { y: 30, ease: 'easeIn' });
        TweenMax.to('.dragon-tear2', 2, { alpha: 0, delay: 2 });
        TweenMax.to('.dragon-tear2', 0.001, { y: 0, alpha: 0, delay: 4 });
        tear++;
      }
      if (tear % 4 === 1) {
        TweenMax.to('.dragon-redBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringRed', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringRed', 2, {
          rotation: '5_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 6 === 1) {
        TweenMax.to('.dragon-yellowBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringYellow', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringYellow', 2, {
          rotation: '-10_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      if (tear % 8 === 1) {
        TweenMax.to('.dragon-blueBal', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringBlue', 6, { y: -800, ease: 'easeIn', x: -150 });
        TweenMax.to('.dragon-stringBlue', 2, { rotation: '20_short',
          transformOrigin: '0% 0%',
          ease: 'easeIn',
        });
      }
      setTears();
    };

    factory.dragonClick = () => {
      if (happiness < 26) {
        dragonCry();
      } else {
        if (stats.progress >= 100) {
          breatheFire();
        }
        browRaise();
        mouthOpen();
        flapEars();
        tailSwing();
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

        TweenMax.to('.dragon-hourhand', 1, { rotation: `${hour}_short`, transformOrigin: 'bottom' });
        TweenMax.to('.dragon-minutehand', 1, { rotation: `${minute}_short`, transformOrigin: 'bottom' });
        TweenMax.to('.dragon-secondhand', 1, { rotation: `${second}_short`, transformOrigin: 'bottom' });
      }, 1000);
    };

    factory.getStats = () => {
      return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
        .then(res => {
          stats = res.data.data[0];
          happiness = stats.happiness;
          stats.progress = (stats.goal_progress / stats.goal_amt);
          setAccessories();
          TweenMax.to('.all-drag', 0, { y: 50, x: 65, transformOrigin: 'center' });
          setHappiness();
          setTears();
          if (stats.progress > 50) {
            showWings();
          }
          if (stats.accessories.necklace) {
            setClock();
          }
          return stats;
        }, err => {
          console.warn(err);
        });
    };

    factory.setBackground = () => {
      const datetime1 = newDate1.timeNow();
      const minute1 = datetime1.slice(3, 5) * 360 / 60;
      const hour1 = datetime1.slice(0, 2) * 360 / 12 + (minute1 / 12);
      if (hour1 > 180 && hour1 < 540) {
        $('.ground').css('background-image', 'url(../img/woods_day.png)');
      } else {
        $('.ground').css('background-image', 'url(../img/woods_night.png)');
      }
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
