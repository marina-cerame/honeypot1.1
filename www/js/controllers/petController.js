angular.module('app.pet', [])
.controller('PetCtrl', function($scope, $rootScope, $http) {
  // get pet info
  $http.get('http://localhost:3000/v1/pets/1')
    .then(function(data) {
      const pet = data.data.data[0];
      console.log('PET', pet);
      $rootScope.pet_id = pet.id;
      $scope.goal_amt = pet.goal_amt;
      $scope.petName = pet.name
      $http.get('http://localhost:3000/v1/totals/?pet_id__is=1')
        .then(function(data) {
          const spent = data.data.data[0].total
          console.log(spent);
          $scope.goal.animate(spent / $scope.goal_amt)
        }, function(err) {console.log(err)})
    }, function(err) {console.log(err)})
    $http.get('http://localhost:3000/v1/levels/?pet_id__is=1')
      .then(function(data) {
        console.log(data.data.data[0])
        const level = data.data.data[0].hunger / 100;
        $scope.healthBar.animate(level);

      }, function(err) { console.log(err) })
  console.log($scope, 'heres scope in pet ctrl')
  $scope.test = 'Hello!'
  $scope.food = [
    { name: 'Carrot', price: '5 Bear Cents', hunger: '10 pts'}
  ]
  $scope.bearTouch = function() {
    const earUp = function() {
      TweenLite.to('.ears', .5, { y: -7, onComplete: earDown })
    }
    const earDown = function() {
      TweenLite.to('.ears', .5, { y: 7 })
    }
    earUp();
  }

  $scope.bearGrow = function() {
    console.log('bearGrow')
    TweenLite.to('.bear', .1, { scale: 1.5, x: '-25%' })
  }

  $scope.healthBar = new ProgressBar.Line(healthBar, {

    strokeWidth: 4,
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

  $scope.goal = new ProgressBar.Circle(goal, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    svgStyle: {width: '120%', height: '120%'},
    easing: 'easeInOut',
    duration: 2000,
    text: {
      autoStyleContainer: false,
      style: {
        position: 'relative',
        bottom: '75px',
        right: '-27px'
      }
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#333', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('0%');
      } else {
        circle.setText('Goal: ' + value + '%');
      }
    }
  });
  $scope.bearGrow();

})
