/* global angular Plaid */
/* eslint no-param-reassign: ["error", { "props": false }] */


angular.module('bankAuth.service', ['app.bankAuth'])
  .factory('bankAuth', function ($location, $http, $rootScope) {
    const accountHandler = function (accountName, accountId, accountType) {
      Plaid.create({
        selectAccount: true,
        env: 'tartan',
        clientName: 'Client Name',
        key: 'b7491cfbd7c72652af1c7bf9c9b667',
        product: 'auth',
        onLoad: () => {},
        onSuccess: (token, metadata) => {
          accountName = metadata.account.name;
          // $scope.$apply();
          const postFormat = JSON.stringify({
            public_token: token,
            account_id: metadata.account.id,
            user_id: $rootScope.user,
            type: accountType,
            name: accountName
          });
          $http.post('http://35.167.2.107:3000/v1/bank_tokens', postFormat)
            .then((res) => {
              accountId = res.data.data[0].id;
            }
          );
        },
        onExit: () => {
          console.warn('user closed');
        },
      });
    };
  });
