"use strict";

var joystick = source("cylon-joystick");

var Adaptor = source('adaptor'),
    Driver = source('driver');

var Config = {
  DualShock3: source('config/dualshock_3'),
  Xbox360: source('config/xbox_360'),
  Custom: require('../support/custom')
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
    });

    it("registers the 'dualshock-3' driver", function() {
      expect(registerDriver).to.be.calledWith("cylon-joystick", "dualshock-3");
    });

    it("registers the 'xbox-360' driver", function() {
      expect(registerDriver).to.be.calledWith("cylon-joystick", "xbox-360");
    });

    it("registers the 'custom-joystick' driver", function() {
      expect(registerDriver).to.be.calledWith("cylon-joystick", "custom-joystick");
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Joystick Adaptor", function() {
      expect(joystick.adaptor()).to.be.an.instanceOf(Adaptor);
    })
  });

  describe("#driver", function() {
    var opts = { name: 'custom', device: {}, extraParams: { config: 'test.json'} };

    context("when opts.name is 'dualshock-3'", function() {
      beforeEach(function() {
        opts.name = "dualshock-3";
      });

      it("returns a new instance of Driver, with DualShock 3 config", function() {
        var driver = joystick.driver(opts)
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.DualShock3);
      });
    });

    context("when opts.name is 'xbox-360'", function() {
      beforeEach(function() {
        opts.name = "xbox-360";
      });

      it("returns a new instance of Driver, with Xbox 360 config", function() {
        var driver = joystick.driver(opts)
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.Xbox360);
      });
    });

    context("when opts.name is 'custom-joystick'", function() {
      beforeEach(function() {
        opts.name = "custom-joystick";
        opts.extraParams.config = __dirname + "/../support/custom.json"
      });

      it("returns a new instance of Driver, with custom config", function() {
        var driver = joystick.driver(opts)
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.Custom);
      });
    });
  });

});
