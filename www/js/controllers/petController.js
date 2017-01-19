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

  $scope.bar = new ProgressBar.Line(healthBar, {
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
  $scope.bar.animate(.5);
})
