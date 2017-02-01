/* global angular */
angular.module('myPetsService', [])
.factory('myPets', function ($http, $rootScope, $ionicPopup) {
  const pets = {
    1: 'pet',
    2: 'octopus',
    3: 'dragon',
  };
  const getAll = () => {
    return $http.get(`http://localhost:3000/v1/pets/?user_id__is=${$rootScope.user}`)
      .then((res) => {
        return res.data.data;
      }, (err) => {
        console.warn(err);
      });
  };

  const showHelp = () => {
    $ionicPopup.alert({
      template: '<p>tap a pet to visit their page <br /> <br />press and hold to edit details</p>',
    });
  };

  return {
    getAll,
    showHelp,
    pets,
  };
});
