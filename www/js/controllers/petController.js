angular.module('app.pet', [])
.controller('PetCtrl', function($scope, $rootScope, $http, $window, $state) {
  // $('div').remove('#goal');
//   // $('div').remove('#healthBar');
//   var $goal = $("<div>", {id: "foo"})
// $('.ground').append($goal)
//   // $('.ground').append('<div></div>').attr('id', 'goal');
//   $('.ground').append('<div></div>').attr('id', 'healthBar');

  $http.get(`http://localhost:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
    .then(function(res) {
      console.log(res);
      $scope.goal_amt = res.data.data[0].goal_amt;
      $scope.petName = res.data.data[0].name;
      $scope.goal_progress = res.data.data[0].goal_progress;
      $scope.hunger = res.data.data[0].hunger;
      $scope.happiness = res.data.data[0].happiness;
      $scope.progress = $scope.goal_progress / $scope.goal_amt;
      console.log($scope.progress + ' progress');
      $scope.goal.animate($scope.progress);
      $scope.health = $scope.hunger / 100;
      console.log($scope.health + ' health');
      $scope.healthBar.animate($scope.health);
    }, function(err) {
      console.log(err);
    })
  //
  // setTimeout(function() {
  //   $scope.goal.animate($scope.progress);
  // }, 1000);
  //
  // setTimeout(function() {
  //   $scope.healthBar.animate($scope.health);
  // }, 1000);

  $scope.bearTouch = function() {
    const earUp = function() {
      TweenLite.to('.ears', .5, { y: -7, onComplete: earDown })
      TweenLite.to('.leftArm', .5, {rotation:75, transformOrigin:"80% 50%"});
    }
    const earDown = function() {
      TweenLite.to('.ears', .5, { y: 7 })
      TweenLite.to('.leftArm', .5, {rotation:0, transformOrigin:"80% 50%"});
    }
    earUp();
  }
  $scope.bearTilt = function() {
    const left = function() { TweenLite.to('.bear', 1, { rotation: 2, transformOrigin: "50% 50%", onComplete: right }) };
    const right = function() { TweenLite.to('.bear', 1, { rotation: -2, transformOrigin: "50% 50%", onComplete: left }) }
    left();
  }

  $scope.bearGrow = function() {
    TweenLite.to('.bear', .1, { scale: 1.5, y: 230})
  }

  $scope.healthBar = new ProgressBar.Line('#healthBar', {

    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    text: {
      value: 'Health'
    },
    from: {color: '#ff0000'},
    to: {color: '#32CD32'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  });

  $scope.goal = new ProgressBar.Circle('#goal', {
    color: '#000000',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 6,
    trailWidth: 1,
    svgStyle: {width: '120%', height: '120%'},
    easing: 'easeInOut',
    duration: 2000,
    fill: '#fff400',
    text: {
      autoStyleContainer: false,
      style: {
        position: 'relative',
        bottom: '75px',
        right: '-27px'
      }
    },
    from: { color: '#ffbb00', width: 3 },
    to: { color: '#ffbb00', width: 3 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('Goal: 0%');
      } else {
        circle.setText('Goal: ' + value + '%');
      }
    }
  });
  $scope.bearGrow();
  $scope.bearTilt();

  // $('div').remove('#goal');
  // $('div').remove('#healthBar');

})
