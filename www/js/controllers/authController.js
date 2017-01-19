angular.module('auth', [])

.controller('AuthController', function($scope, $location) {

  $scope.login = function() {
    console.log('login pressed');
  }

  $scope.goToSignup = function() {
    $location.path('/app/signup');
  }

})
