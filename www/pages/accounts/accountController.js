/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.account', [])
  .controller('accountController', function ($scope, $location, $http, $rootScope, account) {
    $http.get(`http://localhost:3000/v1/totals/?user_id__is=${$rootScope.user}`)
      .then(function (res) {
        $scope.total = (res.data.data[0].total / 100).toFixed(2);
      });
    $scope.openChecking = function openChecking() {
      account.checkingHandler.open();
    };
    $scope.openSavings = function openSavings() {
      account.savingsHandler.open();
    };
    $scope.goToPet = function goToPet() {
      $location.path('/market/pet');
    };
    $scope.showHelp = () => { account.showHelp(); };
  });
