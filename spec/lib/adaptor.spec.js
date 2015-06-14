"use strict";

var Cylon = require("cylon"),
    gamepad = require("gamepad");

var Adaptor = lib("adaptor");

describe("Adaptor", function() {
  var adaptor = new Adaptor();

  it("subclasses Cylon.Adaptor", function() {
    expect(adaptor).to.be.an.instanceOf(Cylon.Adaptor);
  });

  describe("constructor", function() {
    beforeEach(function() {
      adaptor = new Adaptor();
    });

    it("sets @connector and @joystick to null by default", function() {
      expect(adaptor.connector).to.be.eql(null);
      expect(adaptor.joystick).to.be.eql(null);
    });
  });

  describe("#connect", function() {
    var clock, callback;

    beforeEach(function() {
      clock = sinon.useFakeTimers();

      callback = spy();

      stub(gamepad, "init");
      stub(gamepad, "numDevices");
      stub(gamepad, "processEvents");
      stub(gamepad, "detectDevices");
    });

    afterEach(function() {
      clock.restore();

      gamepad.init.restore();
      gamepad.numDevices.restore();
      gamepad.processEvents.restore();
      gamepad.detectDevices.restore();
    });

    context("if there are no devices", function() {
      beforeEach(function() {
        gamepad.numDevices.returns(0);
      });

      it("throws an error", function() {
        var fn = function() { adaptor.connect(callback); };
        expect(fn).to.throw(Error, "No Joysticks available.");
      });
    });

    context("if there are devices", function() {
      beforeEach(function() {
        gamepad.numDevices.returns(1);

        adaptor.emit = spy();

        adaptor.connect(callback);
      });

      it("processes events every 5 milliseconds", function() {
        clock.tick(10);
        expect(gamepad.processEvents).to.be.calledTwice;
      });

      it("processes events every 500 milliseconds", function() {
        clock.tick(500);
        expect(gamepad.detectDevices).to.be.called;
      });

      ["attach", "remove", "move", "up", "down"].forEach(function(event) {
        it("proxies events for '" + event + "'", function() {
          gamepad.emit(event, "hello");
          expect(adaptor.emit).to.be.calledWith(event, "hello");
        });
      });
    });
  });

  describe("#getDevices", function() {
    beforeEach(function() {
      stub(gamepad, "numDevices").returns(1);
      stub(gamepad, "deviceAtIndex").returns({ id: 0 });
    });

    afterEach(function() {
      gamepad.numDevices.restore();
      gamepad.deviceAtIndex.restore();
    });

    it("returns all known devices", function() {
      expect(adaptor.getDevices()).to.be.eql([{ id: 0 }]);
    });
  });
});
