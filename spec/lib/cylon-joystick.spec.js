"use strict";

var joystick = lib("../");

var Adaptor = lib("adaptor"),
    Driver = lib("driver");

var path = require("path");

var Config = {
  DualShock3: lib("config/dualshock_3"),
  Xbox360: lib("config/xbox_360"),
  Custom: require("../support/custom")
};

describe("Cylon.Joystick", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(joystick.adaptors).to.be.eql(["joystick"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(joystick.drivers).to.be.eql(
        ["dualshock-3", "dualshock-4", "xbox-360", "joystick"]
      );
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Joystick Adaptor", function() {
      expect(joystick.adaptor()).to.be.an.instanceOf(Adaptor);
    });
  });

  describe("#driver", function() {
    var opts = { name: "custom", adaptor: {}, config: "test.json" };

    context("when opts.driver is 'dualshock-3'", function() {
      beforeEach(function() {
        opts.driver = "dualshock-3";
      });

      it("returns a new instance of Driver, with DualShock config", function() {
        var driver = joystick.driver(opts);
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.DualShock3);
      });
    });

    context("when opts.driver is 'xbox-360'", function() {
      beforeEach(function() {
        opts.driver = "xbox-360";
      });

      it("returns a new instance of Driver, with Xbox 360 config", function() {
        var driver = joystick.driver(opts);
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.Xbox360);
      });
    });

    context("when opts.driver is 'joystick'", function() {
      beforeEach(function() {
        opts.driver = "joystick";
        opts.config = path.join(__dirname, "/../support/custom.json");
      });

      it("returns a new instance of Driver, with custom config", function() {
        var driver = joystick.driver(opts);
        expect(driver).to.be.an.instanceOf(Driver);
        expect(driver.config).to.be.eql(Config.Custom);
      });
    });
  });
});
