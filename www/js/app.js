// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter',['ionic',
                          'ui.router',
                          'starter.controllers',
                          'auth',
                          'myPets',
                          'app.pet',
                          'app.bankAuth',
                          'app.firstPet',
                          'app.store',
                          'app.account',
                          'app.adoptPet',
                          'editPet'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('market', {
    url: '/market',
    templateUrl: 'templates/marketmenu.html',
    controller: 'AppCtrl'
  })

  .state('market.pet', {
    url: '/pet',
    views: {
      'menuContent': {
        templateUrl: 'templates/pet.html',
        controller: 'PetCtrl'
      }
    }
  })

  .state('firstPet', {
    url: '/firstPet',
    templateUrl: 'templates/firstPet.html',
    controller: 'FirstPetCtrl'
  })

  .state('app.adoptPet', {
    url: '/adoptPet',
    views: {
      'menuContent': {
        templateUrl: 'templates/adoptPet.html',
        controller: 'adoptPetCtrl'
      }
    }
  })

  .state('app.store', {
    url: '/store',
    views: {
      'menuContent': {
        templateUrl: 'templates/store.html',
        controller: 'StoreCtrl'
      }
    }
  })

    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'accountController'
        }
      }
    })

  .state('app.editPet', {
    url: '/editPet',
    views: {
      'menuContent': {
        templateUrl: 'templates/editPet.html',
        controller: 'editPetController'
      }
    }
  })

  .state('app.myPets', {
    url: '/myPets',
    views: {
      'menuContent': {
        templateUrl: 'templates/myPets.html',
        controller: 'MyPetsCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthController'
  })

  .state('bankAuth', {
    url: '/bankAuth',
    templateUrl: 'templates/bankAuth.html',
    controller: 'BankCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'AuthController'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
