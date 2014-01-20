(function() {
  'use strict';
  var keyboard;

  keyboard = source("drivers/xbox360");

  describe("Cylon.Drivers.Joystick.Xbox360", function() {
    var button;
    button = new Cylon.Drivers.Joystick.Xbox360({
      name: 'stick',
      device: {
        connection: 'connect'
      }
    });
    return it("needs tests");
  });

}).call(this);
