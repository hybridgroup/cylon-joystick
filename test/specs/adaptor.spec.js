'use strict';

var Cylon = require('cylon'),
    SDL = require('sdl');

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
    var callback;

    beforeEach(function() {
      callback = spy();

      stub(SDL, 'init');
      stub(SDL, 'numJoysticks');
      stub(SDL, 'Joystick');
    });

    afterEach(function() {
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
