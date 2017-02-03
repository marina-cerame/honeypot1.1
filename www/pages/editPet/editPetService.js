/* global angular */
angular.module('editPetService', [])
.factory('editPet', function ($http, $location, $rootScope, $ionicPopup) {
  const edit = pet => {
    $http.put(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`, pet)
      .then(() => {
        $location.path('/app/myPets');
      }, err => {
        $ionicPopup.alert({
          title: err,
        });
      });
  };

  const deleter = () => {
    $ionicPopup.confirm({
      template: 'Are you sure you want to delete this pet?',
    })
      .then(res => {
        if (res) {
          return $http.delete(`http://35.167.2.107:3000/v1/pets/${$rootScope.pet.id}`)
            .then(() => {
              $location.path('/app/myPets');
            }, err => {
              $ionicPopup.alert({
                title: err,
              });
            });
        }
      });
  };

  const showHelp = () => {
    $ionicPopup.alert({
      template: '<p>Change any field to update your pet or goal.</p>',
    });
  };

  return {
    edit,
    deleter,
    showHelp,
  };
});
