angular.module('app.pet', [])
.controller('PetCtrl', function($scope, $rootScope, $http, $window, $state) {
  console.log($window.innerHeight, 'inner height')


  $http.get(`http://localhost:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
    .then(function(res) {
      console.log(res);
      $scope.goal_amt = res.data.data[0].goal_amt;
      $scope.petName = res.data.data[0].name;
      $scope.goal_progress = res.data.data[0].goal_progress;
      $scope.hunger = res.data.data[0].hunger;
      $scope.happiness = res.data.data[0].happiness;
      $scope.progress = $scope.goal_progress / $scope.goal_amt;
      $scope.goal = res.data.data[0].goal_name;
      console.log(res + ' progress');
      console.log($scope.happiness, 'heres happiness')
      $scope.health = $scope.hunger;
    }, function(err) {
      console.log(err);
    })

  $scope.bearTouch = function() {
    const earUp = function() {
      TweenMax.to('.ears', .5, { y: -7, onComplete: earDown })
      TweenMax.to('.leftArm', .5, {rotation:75, transformOrigin:"80% 50%"});
      TweenMax.to('.balloons', .5, {y: -77, x: 12})

    }
    const earDown = function() {
      TweenMax.to('.ears', .5, { y: 7 })
      TweenMax.to('.leftArm', .5, {rotation:0, transformOrigin:"80% 50%"});
      TweenMax.to('.balloons', .5, {y: 0, x: 0})
    }
    earUp();
  }
  $scope.bearTilt = function() {
    const left = function() { TweenMax.to('.bear', 1, { rotation: 2, transformOrigin: "50% 50%", onComplete: right }) };
    const right = function() { TweenMax.to('.bear', 1, { rotation: -2, transformOrigin: "50% 50%", onComplete: left }) }
    left();
  }
  $scope.bearGrow = function() {
    TweenMax.to('.bear', .1, { scale: 1.15, y: 130})
  }

  /////// CLOCK FUNCTIONS///////
  Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
   }

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

    TweenMax.to('.hourHand', 1, {rotation: hour + "_short", transformOrigin: "bottom"})
    TweenMax.to('.minuteHand', 1, {rotation: minute + "_short", transformOrigin: "bottom"})
    TweenMax.to('.secondHand', 1, {rotation: second + "_short", transformOrigin: "bottom"})
  }, 1000);

  ///////////Sun & Moon/////////////
  TweenMax.to('.sun', .001, {alpha: 0, rotation: 180, transformOrigin: "0px 1000px"})
  TweenMax.to('.moon', .001, {alpha: 0})
  let newDate1 = new Date(), datetime1 = newDate1.timeNow(), second1 = datetime1.slice(6,8) * 360 / 60,
      minute1 = datetime1.slice(3,5) * 360 / 60, hour1 = datetime1.slice(0,2) * 360 / 12 + (minute1 / 12);
  if(hour1 > 180 && hour1 < 540) {
    TweenMax.fromTo('.sun', 1.5, {alpha: 1}, {rotation: 360, ease: "easeOut", transformOrigin: "0px 1000px"})
  }
  //////////Sad Bear///////////////
  if($scope.happiness < 50) {
    TweenMax.fromTo('.mouth', 1, {alpha: 0})
    
  }
  console.log($scope.happiness)
  $scope.bearGrow();
  $scope.bearTilt();



})
