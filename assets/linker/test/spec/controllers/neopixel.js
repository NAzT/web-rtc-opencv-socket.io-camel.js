'use strict';

describe('Controller: NeopixelCtrl', function () {

  // load the controller's module
  beforeEach(module('linkerApp'));

  var NeopixelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeopixelCtrl = $controller('NeopixelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
