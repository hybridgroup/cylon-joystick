"use strict";

var Cylon = require("cylon");

var Driver = lib("driver"),
    Config = lib("config/dualshock_3");

var EventEmitter = require("events").EventEmitter;

describe("Driver", function() {
  var driver;

  beforeEach(function() {
    driver = new Driver({
      connection: new EventEmitter(),
      config: "./config/dualshock_3"
    });
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
            productID: 616,
            description: "PLAYSTATION(R)3 Controller"
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

  describe("on event", function() {
    beforeEach(function() {
      driver.controllerId = 1;
      driver.emit = spy();

      driver.handleJoystickEvents();
    });

    context("if the event is for a different controller", function() {
      beforeEach(function() {
        driver.connection.emit("move", 0, 1, 0.5);
        driver.connection.emit("down", 0, 15);
        driver.connection.emit("up", 0, 12);
      });

      it("does not emit any events", function() {
        expect(driver.emit).to.not.be.called;
      });
    });

    describe("move", function() {
      beforeEach(function() {
        driver.connection.emit("move", 1, 1, 0.5);
      });

      it("emits the axis:move event with the movement value", function() {
        expect(driver.emit).to.be.calledWith("left_y:move", 0.5);
      });
    });

    describe("down", function() {
      beforeEach(function() {
        driver.connection.emit("down", 1, 15);
      });

      it("emits the button:press event", function() {
        expect(driver.emit).to.be.calledWith("square:press");
      });
    });

    describe("up", function() {
      beforeEach(function() {
        driver.connection.emit("up", 1, 12);
      });

      it("emits the button:release event", function() {
        expect(driver.emit).to.be.calledWith("triangle:release");
      });
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
