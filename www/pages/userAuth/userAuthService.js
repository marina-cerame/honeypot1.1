/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('authService', [])
.factory('Auth', function ($http, $rootScope, $location, $ionicPopup) {
  const login = (user) => {
    $http.post('http://localhost:3000/v1/access_tokens', user)
      .then((res) => {
        $rootScope.user = res.data.data[0].user_id;
        console.log('user: ', $rootScope.user);
        $http.get(`http://localhost:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
          .then((resp) => {
            console.log('tokens: ', resp);
            resp.data.data.forEach(entry => {
              if (entry.type === 'checking') {
                $rootScope.checkingName = entry.name;
                $rootScope.checking_id = entry.id;
              } else {
                $rootScope.savingsName = entry.name;
                $rootScope.savings_id = entry.id;
              }
            });
          }, (err) => {
            console.warn(err);
          });
        $location.path('/app/myPets');
      }, (err) => {
        console.warn(err);
        $ionicPopup.alert({
          title: 'wrong username or password',
        });
      });
  };

  const signup = (user) => {
    $http.post('http://localhost:3000/users', user)
      .then((res) => {
        console.log(res, ' resppoonnnsseeê');
        if (typeof res.data.data[0] === 'string') {
          $ionicPopup.alert({
            title: res.data.data[0],
          });
        }
        $http.post('http://localhost:3000/v1/access_tokens', user)
          .then((res) => {
            $rootScope.user = res.data.data[0].user_id;
            $location.path('/bankAuth');
          }, (err) => {
            console.warn(err);
          });
      }, (err) => {
        console.warn(err);
        $ionicPopup.alert({
          title: 'this email is in use',
        });
      });
  };

  return {
    login,
    signup,
  };
});
