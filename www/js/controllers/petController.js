angular.module('app.pet', [])
.controller('PetCtrl', function($scope, $rootScope, $http) {

  $http.get(`http://localhost:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
    .then(function(res) {
      $scope.goal_amt = res.data.data[0].goal_amt;
      $scope.petName = res.data.data[0].name;
      $scope.goal_progress = res.data.data[0].goal_progress;
      $scope.hunger = res.data.data[0].hunger;
      $scope.happiness = res.data.data[0].happiness;
      $scope.progress = ($scope.goal_progress / $scope.goal_amt) * 100;
      $scope.goal = res.data.data[0].goal_name;
      $scope.health = $scope.hunger;

      //For happiness
      if($scope.happiness < 51) {
        TweenMax.to('.mouth', .5, {alpha: 0})
        TweenMax.to('.frown', .5, {alpha: 1})
        if($scope.happiness < 26) {
          TweenMax.to('.tears', 2, {alpha: 1})
        }
      } else {
        $scope.bearTilt();
      }
    }, function(err) {
      console.log(err);
    });

  $scope.bearTouch = function() {
    const earUp = function() {
      TweenMax.to('.ears', .5, { y: -7, onComplete: earDown });
      TweenMax.to('.leftArm', .5, {rotation:75, transformOrigin:'80% 50%'});
      TweenMax.to('.balloons', .5, {y: -77, x: 12});
    };
    const earDown = function() {
      TweenMax.to('.ears', .5, { y: 7 })
      TweenMax.to('.leftArm', .5, {rotation:0, transformOrigin:"80% 50%"});
      TweenMax.to('.balloons', .5, {y: 0, x: 0})
    }
    if($scope.happiness > 25) {
      earUp();
    } else {
      if(tear === 1) {
        TweenMax.to('.tear3', 4, {y:30, ease: 'easeIn'})
        TweenMax.to('.tear3', 2, {alpha: 0, delay: 2})
        TweenMax.to('.tear3', .001, {y: 0, alpha: 1, delay: 4})
        tear++;
      } else {
        TweenMax.to('.tear2', 4, {y:30, ease: 'easeIn'})
        TweenMax.to('.tear2', 2, {alpha: 0, delay: 2})
        TweenMax.to('.tear2', .001, {y: 0, alpha: 1, delay: 4})
        tear = 1;
      }
      console.log('test')
    }
  }
  $scope.bearTilt = function() {
    const left = function() { TweenMax.to('.bear', 1, { rotation: 2, transformOrigin: '50% 50%', onComplete: right }); };
    const right = function() { TweenLite.to('.bear', 1, { rotation: -2, transformOrigin: '50% 50%', onComplete: left }); };
    left();
  };

  $scope.bearGrow = function() {
    TweenMax.to('.bear', .1, { scale: 1.15, y: 130});
  };

  /////// CLOCK FUNCTIONS///////
  Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?'0':'') + this.getHours() +':'+ ((this.getMinutes() < 10)?'0':'') + this.getMinutes() +':'+ ((this.getSeconds() < 10)?'0':'') + this.getSeconds();
  };

  let newDate, datetime, second, minute, hour;
  setInterval(function() {
    newDate = new Date();
    datetime = newDate.timeNow();
    second = datetime.slice(6,8) * 360 / 60;
    minute = datetime.slice(3,5) * 360 / 60;
    hour = datetime.slice(0,2) * 360 / 12 + (minute / 12);
    if (hour === 360) {
      hour = 0;
    }
    if(minute === 360) {
      minute = 0;
    }
    if (second === 360) {
      second = 0;
    }

    TweenMax.to('.hourHand', 1, {rotation: hour + '_short', transformOrigin: 'bottom'});
    TweenMax.to('.minuteHand', 1, {rotation: minute + '_short', transformOrigin: 'bottom'});
    TweenMax.to('.secondHand', 1, {rotation: second + '_short', transformOrigin: 'bottom'});
  }, 1000);

  ///////////Sun & Moon/////////////
  TweenMax.to('.sun', .001, {alpha: 0, rotation: 180, transformOrigin: "0px 1000px"})
  TweenMax.to('.moon', .001, {alpha: 0, rotation: 180, transformOrigin: "0px 1000px"})
  let newDate1 = new Date(), datetime1 = newDate1.timeNow(), second1 = datetime1.slice(6,8) * 360 / 60,
      minute1 = datetime1.slice(3,5) * 360 / 60, hour1 = datetime1.slice(0,2) * 360 / 12 + (minute1 / 12);
  if(hour1 > 180 && hour1 < 540) {
    TweenMax.fromTo('.sun', 1.5, {alpha: 1}, {rotation: 360, ease: "easeOut", transformOrigin: "0px 1000px"})
  } else {
    TweenMax.fromTo('.moon', 1.5, {alpha: 1}, {rotation: 360, ease: "easeOut", transformOrigin: "0px 1000px"})
  }
  //////////Sad Bear///////////////
  TweenMax.to('.tears', .001, {alpha:0})
  TweenMax.to('.frown', .001, {alpha:0})
  let tear = 1;

  console.log($scope.happiness)
  $scope.bearGrow();


})
