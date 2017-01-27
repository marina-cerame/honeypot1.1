angular.module('app.account', [])

    .controller('accountController',

        function($scope, $location, $http, $rootScope) {
            console.log($rootScope.user, 'THIS IS THE USER IN THE ROOT SCOPE')
            $http.get(`http://35.167.2.107:3000/v1/totals/?user_id__is=${$rootScope.user}`)
              .then(function(res){
                console.log(res.data.data[0]);
                $scope.total=res.data.data[0].total;
              })

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
                    $http.put(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.checking_id}`, postFormat)
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
                    $http.put(`http://35.167.2.107:3000/v1/bank_tokens/${$rootScope.savings_id}`, postFormat)
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
            $scope.goToPet = function() {
               $location.path('/market/pet');
             };
        }
    );
