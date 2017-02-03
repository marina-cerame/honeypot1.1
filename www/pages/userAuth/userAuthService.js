/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('authService', [])
.factory('Auth', function ($http, $rootScope, $location, $ionicPopup) {
  const login = (user) => {
    $http.post('http://35.167.2.107:3000/v1/access_tokens', user)
      .then((res) => {
        $rootScope.user = res.data.data[0].user_id;
        $http.get(`http://35.167.2.107:3000/v1/bank_tokens/?user_id__is=${$rootScope.user}`)
          .then((resp) => {
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
            $ionicPopup.alert({
              title: err,
            });
          });
        $location.path('/app/myPets');
      }, (err) => {
        $ionicPopup.alert({
          title: 'wrong username or password',
          template: err,
        });
      });
  };

  const signup = (user) => {
    $http.post('http://35.167.2.107:3000/users', user)
      .then((res) => {
        if (typeof res.data.data[0] === 'string') {
          $ionicPopup.alert({
            title: res.data.data[0],
          }).then(() => {
            $location.path('/signup');
          });
        }
        $http.post('http://35.167.2.107:3000/v1/access_tokens', user)
          .then((res) => {
            $rootScope.user = res.data.data[0].user_id;
            $location.path('/bankAuth');
          }, (err) => {
            $ionicPopup.alert({
              title: err,
            });
          });
      }, (err) => {
        $ionicPopup.alert({
          title: 'this email is in use',
          template: err,
        });
      });
  };

  const compare = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return true;
    }
    return false;
  };

  return {
    login,
    signup,
    compare,
  };
});
