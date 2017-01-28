/* eslint no-param-reassign: ["error", { "props": false }] */
/* global angular Plaid */

angular.module('app.bankAuth', [])
.controller('BankCtrl', function ($scope, $rootScope, $location, bankAuth) {
  const checkingHandler = bankAuth.accountHandler($rootScope.checkingName, $rootScope.checking_id, 'checking');
  const savingsHandler = bankAuth.accountHandler($rootScope.savingsName, $rootScope.savings_id, 'savings');
  $scope.openChecking = () => {
    checkingHandler.open();
  };
  $scope.openSavings = () => {
    savingsHandler.open();
  };
  $scope.goToFirstPet = () => {
    $location.path('/firstPet');
  };
});
