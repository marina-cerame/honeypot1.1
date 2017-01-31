/* global angular TweenMax */
/* eslint no-param-reassign: ["error", { "props": false }] */

angular.module('app.dragon', [])
  .controller('DragonCtrl', function ($scope, $rootScope, $http, Dragon) {
    console.log($rootScope.pet, 'dragon root pet')
  });
