/* global angular */
angular.module('myPetsService', [])
.factory('myPets', function ($http, $rootScope, $ionicPopup) {
  const getAll = () => {
    return $http.get(`http://35.167.2.107:3000/v1/pets/?user_id__is=${$rootScope.user}`)
      .then((res) => {
        return res.data.data;
      }, (err) => {
        console.warn(err);
      });
  };

  const showHelp = () => {
    $ionicPopup.alert({
      template: '<p>tap a pet to visit their page <br /> <br />press and hold a pet to edit details</p>',
    });
  };

  return {
    getAll,
    showHelp,
  };
});
