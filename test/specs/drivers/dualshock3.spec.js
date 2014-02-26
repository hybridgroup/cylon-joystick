(function() {
  'use strict';
  var driver;

  driver = source("drivers/dualshock3");

  describe("Cylon.Drivers.Joystick.DualShock3", function() {
    var joystick;
    joystick = new Cylon.Drivers.Joystick.DualShock3({
      name: 'stick',
      device: {
        connection: 'connect'
      }
    });
    return it("needs tests");
  });

}).call(this);
