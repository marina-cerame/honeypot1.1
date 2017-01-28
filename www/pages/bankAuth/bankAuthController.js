/* eslint no-param-reassign: ["error", { "props": false }] */
/* global angular Plaid */

angular.module('app.bankAuth', [])
.controller('BankCtrl', function ($scope, $rootScope, $location, bankAuth) {
  $scope.openChecking = () => {
    bankAuth.checkingHandler.open();
  };
  $scope.openSavings = () => {
    bankAuth.savingsHandler.open();
  };
  $scope.goToFirstPet = () => {
    $location.path('/firstPet');
  };
});
