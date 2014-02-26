(function() {
  'use strict';
  var driver;

  driver = source("drivers/xbox360");

  describe("Cylon.Drivers.Joystick.Xbox360", function() {
    var joystick;
    joystick = new Cylon.Drivers.Joystick.Xbox360({
      name: 'stick',
      device: {
        connection: 'connect'
      }
    });
    return it("needs tests");
  });

}).call(this);
