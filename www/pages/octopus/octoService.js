angular.module('octo.service', ['app.octo'])
  .factory('Octo', function ($rootScope, $http, $ionicPopup) {
    const factory = {};

    factory.getStats = () => {
      return $http.get(`http://35.167.2.107:3000/v1/pet_stats/?id__is=${$rootScope.pet.id}`)
        .then(res => {
          stats = res.data.data[0];
          happiness = stats.happiness;
          stats.progress = (stats.goal_progress / stats.goal_amt);
          // setAccessories();
          // setHappiness();
          // setEvolution();
          // if (stats.accessories.necklace) {
          //   setClock();
          // }
          return stats;
        }, err => {
          console.warn(err);
        });
    };

    factory.showHelp = () => {
      $ionicPopup.alert({
        template: '<p>bars indicate pet status<br />when levels are low visit the store</p>',
      });
    };

    return factory;
  });
