(function() {
  'use strict';
  var adaptor;

  adaptor = source("adaptors/xbox360");

  describe("Cylon.Adaptors.Joystick", function() {
    var keyboard;
    keyboard = new Cylon.Adaptors.Joystick.Xbox360({
      initialize: false
    });
    return it("needs tests");
  });

}).call(this);
