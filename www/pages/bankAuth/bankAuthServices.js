/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('bankAuth.service', ['app.bankAuth'])
  .factory('bankAuth', function ($location, $http, $rootScope, $ionicPopup) {
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
        $http.post('http://localhost:3000/v1/bank_tokens', postFormat)
          .then((res) => {
            console.log('bank tokens post res: ', res);
            $rootScope.checking_id = res.data.data[0].id;
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
        $http.post('http://localhost:3000/v1/bank_tokens', postFormat)
          .then((res) => {
            console.log('savings res: ', res);
            $rootScope.savings_id = res.data.data[0].id;
          });
      },
      onExit: () => {
        console.warn('user closed');
      },
    });
    const showHelp = () => {
      $ionicPopup.alert({
        template: '<p>click add account to securely log on to both your checking and savings</p>',
      });
    };
    return {
      checkingHandler,
      savingsHandler,
      showHelp,
    };
  });
