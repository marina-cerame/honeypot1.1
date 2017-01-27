/* eslint no-param-reassign: ["error", { "props": false }] */
angular.module('app.adoptPet', [])
.controller('adoptPetCtrl', function ($scope, $http, $rootScope, $location) {
  $scope.data = {};
  $scope.newpet = {};
  $scope.petTypes = [];
  $scope.petImages = {
    1: '../img/pets/bear.png',
    2: '../img/pets/octopus.png',
    3: '../img/pets/dragon.png',
  };

  const setupSlider = () => {
  // some options to pass to our slider
    $scope.data.sliderOptions = {
      initialSlide: 0,
      direction: 'horizontal', // or vertical
      speed: 300, // 0.3s transition
      height: 150,
    };

    // create delegate reference to link with slider
    $scope.data.sliderDelegate = null;

    // watch our sliderDelegate reference, and use it when it becomes available
    $scope.$watch('data.sliderDelegate', (newVal) => {
      if (newVal != null) {
        $scope.data.sliderDelegate.on('slideChangeEnd', () => {
          $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
          $scope.selectedPet = $scope.petTypes[$scope.data.sliderDelegate.activeIndex];
          // use $scope.$apply() to refresh any content external to the slider
          $scope.$apply();
        });
      }
    });
  };

  setupSlider();

    // $scope.slideHasChanged = function(index) {
    //   $scope.selectedPet = $scope.petTypes[index];
    //   console.log($scope.selectedPet, 'selected pet!?!?')
    // };

  $http.get('http://35.167.2.107:3000/v1/pet_types')
    .then(res => {
      res.data.data.forEach(type => {
        const types = {
          bear: 'fluffy bear',
          octopus: 'sly octopus',
          dragon: 'fiery dragon',
        };

        $scope.petTypes.push(type);
        for (let i = 0; i < $scope.petTypes.length; i++) {
          $scope.petTypes[i].img = $scope.petImages[$scope.petTypes[i].id];
        }
        $scope.petTypes.forEach(pet => {
          pet.displayType = types[pet.name];
        });
      });
    }, err => {
      console.warn(err);
    });

  $scope.adoptNewPet = () => {
    $scope.newpet.pet_type_id = $scope.selectedPet.id || 1;
    $scope.newpet.user_id = $rootScope.user;

    $http.post('http://35.167.2.107:3000/v1/pets', $scope.newpet)
      .then(() => {
        $location.path('/app/myPets');
      }, err => {
        console.warn(err);
      });
  };
});
