/*
 * cylon-joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var SDL = require('hybridgroup-sdl');

var Adaptor = module.exports = function Adaptor(opts) {
  if (opts == null) {
    opts = {};
  }

  Adaptor.__super__.constructor.apply(this, arguments);

  this.connector = this.joystick = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function connect(callback) {
  SDL.init(SDL.INIT.JOYSTICK);

  if (SDL.numJoysticks() === 0) {
    throw new Error("No SDL Joystick Available.");
  }

  this.connector = this.joystick = new SDL.Joystick(0);

  Cylon.Utils.constantly(this.listenForEvents.bind(this));

  callback();
};

Adaptor.prototype.disconnect = function disconnect(callback) {
  SDL.quit();
  callback();
};

Adaptor.prototype.listenForEvents = function listenForEvents() {
  var event = SDL.pollEvent();

  if (!event) {
    return;
  }

  if (/^JOY/.test(event.type)) {
    this.connection.emit('event', event);
  }
};
