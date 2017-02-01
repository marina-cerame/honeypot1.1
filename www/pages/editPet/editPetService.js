/* global angular */
angular.module('editPetService', [])
.factory('editPet', function ($http, $location, $rootScope) {
  const edit = (pet) => {
    $http.put(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`, pet)
      .then(() => {
        $location.path('/app/myPets');
      }, (err) => {
        console.warn(err);
      });
  };

  const deleter = () => {
    return $http.delete(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`)
      .then(() => {
        $location.path('/app/myPets');
      }, (err) => {
        console.warn(err);
      });
  };
  // you change pet details on this page

  return {
    edit,
    deleter,
  };
});
