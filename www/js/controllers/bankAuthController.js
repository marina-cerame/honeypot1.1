angular.module('app.bankAuth', [])

    .controller('BankCtrl',

        function($scope, $location, $http, $rootScope) {
            $scope.checkingName;
            $scope.savingsName;
            var checkingHandler = Plaid.create({
                selectAccount: true,
                env: 'tartan',
                clientName: 'Client Name',
                key: 'b7491cfbd7c72652af1c7bf9c9b667',
                product: 'auth',
                onLoad: function() {
                    // The Link module finished loading.
                },
                onSuccess: function(token, metadata) {
                    $scope.checkingName = metadata.account.name;
                    $scope.$apply();
                    console.log('metadata>>>>>>>>>>>>>>', metadata);
                    console.log('checking token: ', token)
                    console.log('checking id: ', metadata.account.id);
                    let postFormat = JSON.stringify({
                        public_token: token,
                        account_id: metadata.account.id,
                        type: 'checking',
                        user: $rootScope.user
                    });

                    // $http({
                    //     method: 'POST',
                    //     url: 'http://localhost:8080/authenticate',
                    //     data: {
                    //         'public_token': token,
                    //         'account_id': metadata.account.id
                    //     }
                    // })

                    $http.post('http://localhost:8080/authenticate', postFormat)
                        .then(function(res) {
                        //     let tokenInfo = {
                        //         user_id: $rootScope.user,
                        //         type: 'checking',
                        //         token: res.stripe_bank_account_token
                        //     };
                        //     console.log('tokenInfo: ', tokenInfo);
                        //     $http.post('http://localhost:3000/v1/bank_tokens', tokenInfo)
                        //     .then(function(res) {
                        //         console.log(res);
                        //     }, function(err) {
                        //         console.log(err);
                        // });
                            console.log('this happened: ', res);
                            // res.json(token, metadata.account.id);
                        }, function(err) {
                            console.log('error: ', err);
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
                    $scope.savingsName = metadata.account.name;
                    $scope.$apply();
                    console.log('savings token: ', token);
                    console.log('savings id: ', metadata.account.id);
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
