(function() {
  'use strict';
  var adaptor;

  adaptor = source("adaptors/dualshock3");

  describe("Cylon.Adaptors.Joystick.DualShock3", function() {
    var joystick;
    joystick = new Cylon.Adaptors.Joystick.DualShock3({
      initialize: false
    });
    return it("needs tests");
  });

}).call(this);
