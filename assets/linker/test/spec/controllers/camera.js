'use strict';

describe('Controller: CameraCtrl', function () {

  // load the controller's module
  beforeEach(module('linkerApp'));

  var CameraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CameraCtrl = $controller('CameraCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
