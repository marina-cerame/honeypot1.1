/* global angular, TweenLite */
/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('firstPetService', [
  'app.firstPet',
])

  .factory('First', ($location, $http, $rootScope, $ionicPopup) => {
    const bearShrink = () => {
      TweenLite.to('.first-bear', 2, { scale: 0.75, x: '15%', y: '-40%' });
    };

    const makeFirstPet = firsty => {
      const pet = firsty;
      pet.pet_type_id = 1;
      pet.user_id = $rootScope.user;
      $http.post('http://35.167.2.107:3000/v1/pets', pet)
        .then((res) => {
          $rootScope.pet = res.data.data[0];
          $location.path('/market/pet');
        }, (err) => {
          console.warn(err);
        });
    };

    const showHelp = () => {
      $ionicPopup.alert({
        template: '<p>complete all fields to start saving toward your goal</p>',
      });
    };

    return {
      bearShrink,
      makeFirstPet,
      showHelp,
    };
  });
