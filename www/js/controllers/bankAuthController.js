angular.module('app.bankAuth', [])

    .controller('BankCtrl',

        function($scope, $location, $http, $rootScope) {
            $rootScope.checkingName;
            $rootScope.savingsName;
            console.log('rootScope.checkingName: ', $rootScope.checkingName);
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
                    $rootScope.checkingName = metadata.account.name;
                    console.log('rootScope.checkingName: ', $rootScope.checkingName);
                    $scope.$apply();
                    console.log('metadata>>>>>>>>>>>>>>', metadata);
                    console.log('checking token: ', token)
                    console.log('checking id: ', metadata.account.id);
                    let postFormat = JSON.stringify({
                        public_token: token,
                        account_id: metadata.account.id
                    });
                    $http.post('http://localhost:8080/authenticate', postFormat)
                        .then(function(res) {
                            console.log('this is new RES: ', res);
                            let checkingTokenInfo = JSON.stringify({
                                user_id: $rootScope.user,
                                type: 'checking',
                                token: res.data,
                                name: $rootScope.checkingName
                            });
                            $http.post('http://localhost:3000/v1/bank_tokens', checkingTokenInfo)
                                .then(function(res) {
                                    console.log(res);
                                }, function(err) {
                                    console.log(err);
                                });
                            console.log('this happened: ', res.data);
                            // res.json(token, metadata.account.id);
                        }, function(err) {
                            console.log('error: ', err);
                        }
                    );
                },
                onExit: function() {
                    console.log('user closed');
                    console.log('rootScope.checkingName: ', $rootScope.checkingName);

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
                    console.log('metadata>>>>>>>>>>>>>>', metadata);
                    console.log('savings token: ', token);
                    console.log('savings id: ', metadata.account.id);
                    let postFormat = JSON.stringify({
                        public_token: token,
                        account_id: metadata.account.id
                    });
                    $http.post('http://localhost:8080/authenticate', postFormat)
                        .then(function(res) {
                            let checkingTokenInfo = JSON.stringify({
                                user_id: $rootScope.user,
                                type: 'savings',
                                token: res.data,
                                name: $rootScope.savingsName
                            });
                            $http.post('http://localhost:3000/v1/bank_tokens', checkingTokenInfo)
                                .then(function(res) {
                                    console.log(res);
                                }, function(err) {
                                    console.log(err);
                                });
                            console.log('this happened: ', res.data);
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
