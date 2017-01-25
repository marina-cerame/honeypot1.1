/* global firstPetController, describe, it, expect, should */

describe('FirstPetCtrl', function () {
  'use strict';

  beforeEach(module('app.firstPet'))

    var $controller;
    var $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }))

  describe('bear shrink', function() {
    it('should have a bearShrink function', function() {
      var $scope = {};
      var $rootScope;
      var controller = $controller('FirstPetCtrl', { $scope: $scope, $rootScope: $rootScope });
      expect($scope.bearShrink).to.be.a('function');
    })
  });

  describe('Goal Amounts', function() {
    it('should have ten fiscal goal options', function() {
      var $scope = {};
      var $rootScope;
      var controller = $controller('FirstPetCtrl', { $scope: $scope, $rootScope: $rootScope });
      expect($scope.goal_amt.length).to.be.equal(10);
    })
  });

  describe('$scope.makeFirstPet', function() {

    it('should be a function', inject(function($rootScope, $controller) {
      var $scope = {};
      console.log($rootScope)
      var controller = $controller('FirstPetCtrl', {
        $scope: $scope,
        $rootScope: $rootScope
      });
      expect($scope.makeFirstPet).to.be.a('function');
    }));

    it('creates a first starter bear pet', function() {
      var $scope = {};
      var $rootScope = {};
      var controller = $controller('FirstPetCtrl', {
        $scope: $scope,
        $rootScope: $rootScope
      });
      console.log($rootScope)

      var makeFirst = $scope.makeFirstPet;
      $scope.pet = {
        goal_amt: 300,
        goal_name: "Saurus",
        name: "Jimbo",
        pet_type_id: 1,
        user_id: undefined
      }
      makeFirst();
      expect($rootScope.pet).to.be.equal($scope.pet);
    });
  });


  // it('exists', function () {
  //   expect(makeFirstPet).to.be.a('function');
  //
  // });
  //
  // it('does something', function () {
  //   expect(true).to.equal(false);
  // });
  //
  // it('does something else', function () {
  //   expect(true).to.equal(false);
  // });

  // Add more assertions here
});
