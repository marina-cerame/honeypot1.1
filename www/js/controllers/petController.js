angular.module('app.pet', [])
.controller('PetCtrl', function($scope, $rootScope, $http) {

  $http.get(`http://localhost:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
    .then(function(res) {
      $scope.goal_amt = res.data.data[0].goal_amt;
      $scope.petName = res.data.data[0].name;
      $scope.goal_progress = res.data.data[0].goal_progress;
      $scope.hunger = res.data.data[0].hunger;
      $scope.happiness = res.data.data[0].happiness;
      $scope.progress = $scope.goal_progress / $scope.goal_amt;
      $scope.goal = res.data.data[0].goal_name;
      $scope.health = $scope.hunger;
    }, function(err) {
      console.log(err);
    });

  $scope.bearTouch = function() {
    const earUp = function() {
      TweenLite.to('.ears', .5, { y: -7, onComplete: earDown })
      TweenLite.to('.leftArm', .5, {rotation:75, transformOrigin:"80% 50%"});
      TweenLite.to('.balloons', .5, {y: -77, x: 12})
    };
    const earDown = function() {
      TweenLite.to('.ears', .5, { y: 7 })
      TweenLite.to('.leftArm', .5, {rotation:0, transformOrigin:"80% 50%"});
      TweenLite.to('.balloons', .5, {y: 0, x: 0})
    };
    earUp();
  };
  $scope.bearTilt = function() {
    const left = function() { TweenLite.to('.bear', 1, { rotation: 2, transformOrigin: "50% 50%", onComplete: right }); };
    const right = function() { TweenLite.to('.bear', 1, { rotation: -2, transformOrigin: "50% 50%", onComplete: left }); }
    left();
  };

  $scope.bearGrow = function() {
    TweenLite.to('.bear', .1, { scale: 1.5, y: 130})
  };

  $scope.bearGrow();
  $scope.bearTilt();
});
