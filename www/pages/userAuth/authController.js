/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('auth', [])
.controller('AuthController', function ($scope, $location, Auth) {
  $scope.user = {
    grant_type: 'password',
  };

  $scope.logo = './img/honeypot_logo.png';

  $scope.login = () => Auth.login($scope.user);

  $scope.goToSignup = () => $location.path('/signup');

  $scope.signup = () => Auth.signup($scope.user);

  $scope.goToLogin = () => $location.path('/login');

  $scope.compare = () => Auth.compare($scope.user.password, $scope.user.confirmPassword);
});
