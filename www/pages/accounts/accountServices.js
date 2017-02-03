/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('account.service', ['app.account'])
  .factory('account', function ($location, $http, $rootScope, $ionicPopup) {
    const checkingHandler = Plaid.create({
      selectAccount: true,
      env: 'tartan',
      clientName: 'Client Name',
      key: 'b7491cfbd7c72652af1c7bf9c9b667',
      product: 'auth',
      onLoad: () => {},
      onSuccess: (token, metadata) => {
        $rootScope.checkingName = metadata.account.name;
        const postFormat = JSON.stringify({
          public_token: token,
          account_id: metadata.account.id,
          user_id: $rootScope.user,
          type: 'checking',
          name: $rootScope.checkingName,
        });
        $http.put(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.checking_id}`, postFormat)
          .then(res => {
            $rootScope.checking_id = res.data.data[0].id;
          });
      },
      onExit: () => {},
    });
    const savingsHandler = Plaid.create({
      selectAccount: true,
      env: 'tartan',
      clientName: 'Client Name',
      key: 'b7491cfbd7c72652af1c7bf9c9b667',
      product: 'auth',
      onLoad: () => {},
      onSuccess: (token, metadata) => {
        $rootScope.savingsName = metadata.account.name;
        const postFormat = JSON.stringify({
          public_token: token,
          account_id: metadata.account.id,
          user_id: $rootScope.user,
          type: 'savings',
          name: $rootScope.savingsName,
        });
        $http.put(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.savings_id}`, postFormat)
          .then(res => {
            $rootScope.savings_id = res.data.data[0].id;
          });
      },
      onExit: () => {},
    });
    const showHelp = () => {
      $ionicPopup.alert({
        template: '<p>View your total saved with honeypot or edit your banking information.</p>',
      });
    };
    return {
      checkingHandler,
      savingsHandler,
      showHelp,
    };
  });
