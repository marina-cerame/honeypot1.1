/* global angular */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('menuService', [])
.factory('Menu', function ($rootScope, $location) {
  const logout = () => {
    for (const prop in $rootScope) {
      if (prop.substring(0, 1) !== '$') {
        delete $rootScope[prop];
      }
    }
    $location.path('/login');
  };

  return {
    logout,
  };
});
