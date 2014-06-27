'use strict';

var Cylon = require('cylon'),
    SDL = require('hybridgroup-sdl');

var Adaptor = source('adaptor');

describe("Adaptor", function() {
  var adaptor = new Adaptor();

  it("subclasses Cylon.Adaptor", function() {
    expect(adaptor).to.be.an.instanceOf(Cylon.Adaptor);
  });

  describe("constructor", function() {
    beforeEach(function() {
      adaptor = new Adaptor();
    });

    it('sets @connector and @joystick to null by default', function() {
      expect(adaptor.connector).to.be.eql(null);
      expect(adaptor.joystick).to.be.eql(null);
    })
  });

  describe("#connect", function() {
    var callback, clock;

    beforeEach(function() {
      callback = spy();
      clock = sinon.useFakeTimers();

      stub(Cylon.Utils, 'constantly');
      stub(SDL, 'init');
      stub(SDL, 'numJoysticks');
      stub(SDL, 'Joystick');
    });

    afterEach(function() {
      Cylon.Utils.constantly.restore();
      SDL.init.restore();
      SDL.numJoysticks.restore();
      SDL.Joystick.restore();
    });

    it("initializes SDL", function() {
      adaptor.connect(callback);
      expect(SDL.init).to.be.calledWith(SDL.INIT.JOYSTICK);
    });

    context("if no joysticks are connected", function() {
      beforeEach(function() {
        SDL.numJoysticks.returns(0);
      });

      it("throws an error", function() {
        var fn = function() { adaptor.connect(callback); };
        expect(fn).to.throw(Error, "No SDL Joystick Available.");
      });
    });

    context("if a joystick is connected", function() {
      beforeEach(function() {
        SDL.numJoysticks.returns(1);
      });

      it("creates a new SDL.Joystick", function() {
        adaptor.connect(callback);
        expect(adaptor.connector).to.be.an.instanceOf(SDL.Joystick);
        expect(adaptor.joystick).to.be.an.instanceOf(SDL.Joystick);
      });

      it("starts listening for joystick events", function() {
        adaptor.connect(callback);
        expect(Cylon.Utils.constantly).to.be.called;
      });
    })
  });

  describe("#listenForEvents", function() {
    beforeEach(function() {
      stub(SDL, 'pollEvent');
      adaptor.connection = { emit: spy() };
    });

    afterEach(function() {
      SDL.pollEvent.restore();
    });

    it("polls SDL for events", function() {
      adaptor.listenForEvents();
      expect(SDL.pollEvent).to.be.called;
    });

    context("if SDL has no events", function() {
      beforeEach(function() {
        SDL.pollEvent.returns(null);
      });

      it("doesn't emit anything", function() {
        adaptor.listenForEvents();
        expect(adaptor.connection.emit).to.not.be.called;
      });
    });

    context("if SDL has a joystick event", function() {
      var event;

      beforeEach(function() {
        event = { type: 'JOYAXISMOTION', which: 0, axis: 3, value: 642 };
        SDL.pollEvent.returns(event);
      });

      it("emits an event", function() {
        adaptor.listenForEvents();
        expect(adaptor.connection.emit).to.be.calledWith('event', event);
      });
    });
  });

  describe("#disconnect", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      stub(SDL, 'quit');
    });

    afterEach(function() {
      SDL.quit.restore();
    });

    it("tells SDL to quit", function() {
      adaptor.disconnect(callback);
      expect(SDL.quit).to.be.called;
    });
  });
});
