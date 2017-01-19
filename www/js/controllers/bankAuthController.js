angular.module('app.bankAuth', [
])

    .controller('BankCtrl', [
        '$scope',

        function($scope) {
            $scope.token = 'hello World!';
            var linkHandler = Plaid.create({
                env: 'tartan',
    clientName: 'Client Name',
    key: 'b7491cfbd7c72652af1c7bf9c9b667',
    product: 'auth',
    onLoad: function() {
      // The Link module finished loading.
    },
                onSuccess: function(token) {
                    $scope.token = token;
                    console.log(token);
                    $scope.$apply();
                },
                onExit: function() {
                    console.log('user closed');
                }
            });

            $scope.openPlaid = function(bankType) {
                linkHandler.open(bankType);
            };
        }
    ]);
