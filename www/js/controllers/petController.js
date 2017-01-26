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
      // $scope.goal.animate($scope.progress);
      $scope.health = $scope.hunger;
      // $scope.healthBar.animate($scope.health);
    }, function(err) {
      console.log(err);
    })

  $scope.bearTouch = function() {
    const earUp = function() {
      TweenLite.to('.ears', .5, { y: -7, onComplete: earDown })
      TweenLite.to('.leftArm', .5, {rotation:75, transformOrigin:"80% 50%"});
      TweenLite.to('.balloons', .5, {y: -77, x: 12})

    }
    const earDown = function() {
      TweenLite.to('.ears', .5, { y: 7 })
      TweenLite.to('.leftArm', .5, {rotation:0, transformOrigin:"80% 50%"});
      TweenLite.to('.balloons', .5, {y: 0, x: 0})

    }
    earUp();
  }
  $scope.bearTilt = function() {
    const left = function() { TweenLite.to('.bear', 1, { rotation: 2, transformOrigin: "50% 50%", onComplete: right }) };
    const right = function() { TweenLite.to('.bear', 1, { rotation: -2, transformOrigin: "50% 50%", onComplete: left }) }
    left();
  }

  $scope.bearGrow = function() {
    TweenLite.to('.bear', .1, { scale: 1.15, y: 130})
  }

  /////// CLOCK FUNCTIONS///////
  Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
   }

  setInterval(function() {
    var newDate = new Date();
    var datetime = newDate.timeNow();
    let second = datetime.slice(6,8) * 360 / 60;
    let minute = datetime.slice(3,5) * 360 / 60;
    let hour = datetime.slice(0,2) * 360 / 12 + (minute / 12);
    if (hour === 360) {
      hour = 0;
    }
    console.log(hour, minute);


    TweenLite.to('.hourHand', 1, {rotation: hour, transformOrigin: "bottom"})
    TweenLite.to('.minuteHand', 1, {rotation: minute, transformOrigin: "bottom"})
    TweenLite.to('.secondHand', 1, {rotation: second, transformOrigin: "bottom"})
  }, 1000);

  $scope.bearGrow();
  $scope.bearTilt();



})




  //
  // setTimeout(function() {
  //   $scope.goal.animate($scope.progress);
  // }, 1000);
  //
  // setTimeout(function() {
  //   $scope.healthBar.animate($scope.health);
  // }, 1000);

// $scope.healthBar = new ProgressBar.Line('#healthBar', {
//
//   strokeWidth: 6,
//   easing: 'easeInOut',
//   duration: 1400,
//   color: '#FFEA82',
//   trailColor: '#eee',
//   trailWidth: 1,
//   svgStyle: {width: '100%', height: '100%'},
//   text: {
//     value: 'Health'
//   },
//   from: {color: '#ff0000'},
//   to: {color: '#32CD32'},
//   step: (state, bar) => {
//     bar.path.setAttribute('stroke', state.color);
//   }
// });
//
// $scope.goal = new ProgressBar.Circle('#goal', {
//   color: '#000000',
//   // This has to be the same size as the maximum width to
//   // prevent clipping
//   strokeWidth: 6,
//   trailWidth: 1,
//   svgStyle: {width: '120%', height: '120%'},
//   easing: 'easeInOut',
//   duration: 2000,
//   fill: '#fff400',
//   text: {
//     autoStyleContainer: false,
//     style: {
//       position: 'relative',
//       bottom: '75px',
//       right: '-27px'
//     }
//   },
//   from: { color: '#ffbb00', width: 3 },
//   to: { color: '#ffbb00', width: 3 },
//   // Set default step function for all animate calls
//   step: function(state, circle) {
//     circle.path.setAttribute('stroke', state.color);
//     circle.path.setAttribute('stroke-width', state.width);
//
//     var value = Math.round(circle.value() * 100);
//     if (value === 0) {
//       circle.setText('Goal: 0%');
//     } else {
//       circle.setText('Goal: ' + value + '%');
//     }
//   }
// });

// $('#goal').empty();
// $('div').remove('#goal');
//   // $('div').remove('#healthBar');
//   var $goal = $("<div>", {id: "foo"})
// $('.ground').append($goal)
//   // $('.ground').append('<div></div>').attr('id', 'goal');
//   $('.ground').append('<div></div>').attr('id', 'healthBar');
