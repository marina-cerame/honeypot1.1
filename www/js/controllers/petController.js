angular.module('app.pet', [])
.controller('PetCtrl', function($scope) {
  console.log($scope, 'heres scope in pet ctrl')
  $scope.test = 'Hello!'
  $scope.food = [
    { name: 'Carrot', price: '5 Bear Cents', hunger: '10 pts'}
  ]
  $scope.bearTouch = function() {
    console.log('bearTouch');
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
    easing: 'easeInOut',
    duration: 2000,
    text: {
      autoStyleContainer: false
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
        circle.setText(value + '%');
      }
    }
  });

  // $http({
  // method: 'GET',
  // url: 'http://localhost:3000/v1/levels?pet_id__is={id}'
  // }).then(function successCallback(response) {
  //   // this callback will be called asynchronously
  //   // when the response is available
  // }, function errorCallback(response) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });

  $scope.healthBar.animate(.5);
  $scope.goal.animate(.9)
  $scope.bearGrow();

})
