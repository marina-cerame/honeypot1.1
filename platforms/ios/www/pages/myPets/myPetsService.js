/* global angular */
angular.module('myPetsService', [])
.factory('myPets', function ($http, $rootScope) {
  const getAll = () => {
    return $http.get(`http://35.167.2.107:3000/v1/pets/?user_id__is=${$rootScope.user}`)
      .then((res) => {
        return res.data.data;
      }, (err) => {
        console.warn(err);
      });
  };

  return {
    getAll,
  };
});
