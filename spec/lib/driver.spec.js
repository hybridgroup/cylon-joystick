/* jshint expr:true */
"use strict";

var Cylon = require("cylon");

var Driver = source("driver"),
    Config = source("config/dualshock_3");

describe("Driver", function() {
  var driver = new Driver({
    connection: {},
    config: "./config/dualshock_3"
  });

  it("is a subclass of Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
    expect(driver).to.be.an.instanceOf(Driver);
  });

  describe("constructor", function() {
    it("sets @config to the provided JSON config", function() {
      expect(driver.config).to.be.eql(Config);
    });
  });

  describe("#start", function() {
    var callback;

    beforeEach(function() {
      callback = spy();

      driver.connection = {
        on: spy(),
        getDevices: function() {
          return [{
            deviceID: 0,
            vendorID: 1356,
            productID: 616
          }];
        }
      };

      driver.start(callback);
    });

    it("assigns controllerId to the matching controller", function() {
      expect(driver.controllerId).to.be.eql(0);
    });

    it("listens for 'move' events", function() {
      expect(driver.connection.on).to.be.calledWith("move");
    });

    it("listens for 'up' events", function() {
      expect(driver.connection.on).to.be.calledWith("up");
    });

    it("listens for 'down' events", function() {
      expect(driver.connection.on).to.be.calledWith("down");
    });
  });

  describe("#findInConfig", function() {
    context("when told to search for axes", function() {
      it("returns the axis corresponding to the provided ID", function() {
        var res = driver.findInConfig("axis", 0);
        expect(res).to.be.eql("left_x");
      });
    });

    context("when told to search for buttons", function() {
      it("returns the button corresponding to the provided ID", function() {
        var res = driver.findInConfig("buttons", 0);
        expect(res).to.be.eql("select");
      });
    });
  });
});
