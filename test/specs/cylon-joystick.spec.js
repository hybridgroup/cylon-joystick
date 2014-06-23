"use strict";

var joystick = source("cylon-joystick");

var Adaptor = source('adaptor');

var Drivers = {
  DualShock3: source('drivers/dualshock_3')
}

describe("Cylon.Joystick", function() {
  describe("#register", function() {
    var robot, registerAdaptor, registerDriver;

    beforeEach(function() {
      robot = { registerAdaptor: spy(), registerDriver: spy() };

      registerAdaptor = robot.registerAdaptor;
      registerDriver = robot.registerDriver;

      joystick.register(robot);
    });

    it("registers the 'joystick' adaptor", function() {
      expect(registerAdaptor).to.be.calledWith("cylon-joystick", "joystick");
    })

    it("registers the 'dualshock-3' driver", function() {
      expect(registerDriver).to.be.calledWith("cylon-joystick", "dualshock-3");
    })
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Joystick Adaptor", function() {
      expect(joystick.adaptor()).to.be.an.instanceOf(Adaptor);
    })
  });

  describe("#driver", function() {
    var opts = { name: 'custom', device: {} };

    context("when opts.name is 'dualshock-3'", function() {
      beforeEach(function() {
        opts.name = "dualshock-3";
      });

      it("returns a new instance of the DualShock3 Driver", function() {
        expect(joystick.driver(opts)).to.be.an.instanceOf(Drivers.DualShock3);
      });
    })
  });
});
