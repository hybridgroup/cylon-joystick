'use strict';

var Cylon = require('cylon');

var Driver = source('driver'),
    Config = source('config/dualshock_3');

describe("Driver", function() {
  var driver = new Driver({
    device: { connection: {} },
    extraParams: { config: './config/dualshock_3' }
  });

  it("is a subclass of Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(Cylon.Driver)
    expect(driver).to.be.an.instanceOf(Driver)
  })

  describe("constructor", function() {
    it('sets @config to the provided JSON config', function() {
      expect(driver.config).to.be.eql(Config);
    });
  });

  describe("#start", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.connection = { on: spy() }
    });

    it("sets a handler for the 'event' connection event", function() {
      driver.start(callback);
      expect(driver.connection.on).to.be.calledWith("event");
    });
  });

  describe("handleSDLEvent", function() {
    var event, emit;
    beforeEach(function() {
      driver.device = { emit: spy() };

      emit = driver.device.emit;

      event = { type: 'JOYAXISMOTION' };
    });

    context("when the event is an axis motion", function() {
      it("emits an event with the axis that moved, and it's value", function() {
        event = { type: 'JOYAXISMOTION', axis: 0, value: -1024 };
        driver.handleSDLEvent(event);
        expect(emit).to.be.calledWith("left_x:move", -1024);
      });
    });

    context("when the event is a button press", function() {
      it("emits an event with the button that was pressed", function() {
        event = { type: 'JOYBUTTONDOWN', button: 0 };
        driver.handleSDLEvent(event);
        expect(emit).to.be.calledWith("select:press");
      });
    });

    context("when the event is a button release", function() {
      it("emits an event with the button that was released", function() {
        event = { type: 'JOYBUTTONUP', button: 0 };
        driver.handleSDLEvent(event);
        expect(emit).to.be.calledWith("select:release");
      });
    });
  });

  describe("#findInConfig", function() {
    context("when told to search for axes", function() {
      it('returns the axis corresponding to the provided ID', function() {
        var res = driver.findInConfig("axis", 0);
        expect(res).to.be.eql("left_x");
      });
    });

    context("when told to search for buttons", function() {
      it('returns the button corresponding to the provided ID', function() {
        var res = driver.findInConfig("buttons", 0);
        expect(res).to.be.eql("select");
      });
    });
  });
});
