angular.module('app.bankAuth', [])

    .controller('BankCtrl',

        function($scope, $location, $http, $rootScope) {
            $rootScope.checkingName;
            $rootScope.savingsName;
            var checkingHandler = Plaid.create({
                selectAccount: true,
                env: 'tartan',
                clientName: 'Client Name',
                key: 'b7491cfbd7c72652af1c7bf9c9b667',
                product: 'auth',
                onLoad: function() {
                },
                onSuccess: function(token, metadata) {
                    $rootScope.checkingName = metadata.account.name;
                    $scope.$apply();
                    let postFormat = JSON.stringify({
                        public_token: token,
                        account_id: metadata.account.id,
                        user_id: $rootScope.user,
                        type: 'checking',
                        name: $rootScope.checkingName
                    });
                    $http.post('http://localhost:3000/v1/bank_tokens', postFormat)
                        .then(function(res) {
                            console.log(res);
                            $rootScope.checking_id = res.data.data[0].id;
                        }
                    );
                },
                onExit: function() {
                    console.log('user closed');

                }
            });
            var savingsHandler = Plaid.create({
                selectAccount: true,
                env: 'tartan',
                clientName: 'Client Name',
                key: 'b7491cfbd7c72652af1c7bf9c9b667',
                product: 'auth',
                onLoad: function() {
                    // The Link module finished loading.
                },
                onSuccess: function(token, metadata) {
                    $rootScope.savingsName = metadata.account.name;
                    $scope.$apply();
                    let postFormat = JSON.stringify({
                        public_token: token,
                        account_id: metadata.account.id,
                        user_id: $rootScope.user,
                        type: 'savings',
                        name: $rootScope.savingsName
                    });
                    $http.post('http://localhost:3000/v1/bank_tokens', postFormat)
                        .then(function(res) {
                            console.log(res);
                            $rootScope.savings_id = res.data.data[0].id;
                        }
                    );
                },
                onExit: function() {
                    console.log('user closed');
                }
            });

            $scope.openSavings = function() {
                savingsHandler.open();
            };
            $scope.openChecking = function() {
                checkingHandler.open();
            };
            $scope.goToFirstPet = function() {
               $location.path('/firstPet');
             };
        }
    );
