/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.bankAuth', [])
.controller('BankCtrl', function ($scope, $location, $http, $rootScope) {
  const checkingHandler = Plaid.create({
    selectAccount: true,
    env: 'tartan',
    clientName: 'Client Name',
    key: 'b7491cfbd7c72652af1c7bf9c9b667',
    product: 'auth',
    onLoad: () => {
    },
    onSuccess: (token, metadata) => {
      $rootScope.checkingName = metadata.account.name;
      $scope.$apply();
      const postFormat = JSON.stringify({
        public_token: token,
        account_id: metadata.account.id,
        user_id: $rootScope.user,
        type: 'checking',
        name: $rootScope.checkingName,
      });
      $http.post('http://35.167.2.107:3000/v1/bank_tokens', postFormat)
        .then((res) => {
          $rootScope.checking_id = res.data.data[0].id;
        }
      );
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
    onLoad: () => {
        // The Link module finished loading.
    },
    onSuccess: (token, metadata) => {
      $rootScope.savingsName = metadata.account.name;
      $scope.$apply();
      const postFormat = JSON.stringify({
        public_token: token,
        account_id: metadata.account.id,
        user_id: $rootScope.user,
        type: 'savings',
        name: $rootScope.savingsName,
      });
      $http.post('http://35.167.2.107:3000/v1/bank_tokens', postFormat)
        .then((res) => {
          $rootScope.savings_id = res.data.data[0].id;
        }
      );
    },
    onExit: () => {
      console.warn('user closed');
    },
  });

  $scope.openSavings = () => {
    savingsHandler.open();
  };
  $scope.openChecking = () => {
    checkingHandler.open();
  };
  $scope.goToFirstPet = () => {
    $location.path('/firstPet');
  };
}
);
