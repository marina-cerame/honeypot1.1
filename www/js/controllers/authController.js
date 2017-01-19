angular.module('auth', [])

.controller('AuthController', function($scope, $location) {

  $scope.user = {};

  $scope.login = function() {
    console.log($scope.user, ' user in login');
    //UN, PW, grant_type: pw
    
  };

  $scope.goToSignup = function() {
    $location.path('/app/signup');
  };

  $scope.signup = function() {
    console.log($scope.user, + ' user in signup');
  };

})
