angular.module('app.account', [])

    .controller('accountController',

        function($scope, $location, $http, $rootScope) {
            console.log($rootScope.user, 'THIS IS THE USER IN THE ROOT SCOPE')
            $http.get(`http://localhost:3000/v1/totals/?user_id__is=${$rootScope.user}`)
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
                            let checkingTokenInfo = JSON.stringify({
                                user_id: $rootScope.user,
                                type: 'checking',
                                token: res.data,
                                name: $rootScope.checkingName
                            });
                            $http.put(`http://localhost:3000/v1/bank_tokens/${$rootScope.checking_id}`, checkingTokenInfo)
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
                            let savingsTokenInfo = JSON.stringify({
                                user_id: $rootScope.user,
                                type: 'savings',
                                token: res.data,
                                name: $rootScope.savingsName
                            });
                            $http.put(`http://localhost:3000/v1/bank_tokens/${$rootScope.savings_id}`, savingsTokenInfo)
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
                console.log('THIS IS ROOT USER: ', $rootScope.user);
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
