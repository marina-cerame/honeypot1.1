/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('account.service', ['app.account'])
  .factory('account', function ($location, $http, $rootScope) {
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
        console.log('plaid shit that we send to bank tokens: ', postFormat);
        $http.put(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.checking_id}`, postFormat)
          .then(function (res) {
            console.log('bank tokens from put res: ', res);
            $rootScope.checking_id = res.data.data[0].id;
            console.log('rootScope.checking_id: ', $rootScope.checking_id);
          });
      },
      onExit: () => {
        console.warn('user closed');
      },
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
          .then(function (res) {
            console.log('savings res: ', res);
            $rootScope.savings_id = res.data.data[0].id;
          });
      },
      onExit: () => {
        console.warn('user closed');
      },
    });
    return {
      checkingHandler,
      savingsHandler,
    };
  });
