/*
 * cylon-joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var SDL = require('sdl');

var Adaptor = module.exports = function Adaptor(opts) {
  if (opts == null) {
    opts = {};
  }

  Adaptor.__super__.constructor.apply(this, arguments);

  this.connector = this.joystick = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function connect() {
  SDL.init(SDL.INIT.JOYSTICK);

  if (SDL.numJoysticks() === 0) {
    throw new Error("No SDL Joystick Available.");
  }

  this.connector = this.joystick = new SDL.GameController(0);

  Adaptor.__super__.connect.apply(this, arguments);
};

Adaptor.prototype.disconnect = function disconnect() {
  SDL.quit();
  Adaptor.__super__.disconnect.apply(this, arguments);
};
