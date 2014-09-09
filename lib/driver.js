/*
 * cylon-joystick Driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Driver = module.exports = function Driver(opts) {
  if (opts == null) {
    opts = {};
  }

  var configFile = opts.extraParams.config;

  this.config = require(configFile);

  Driver.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function start(callback) {
  this.connection.on('event', this.handleSDLEvent.bind(this));
  callback();
};

Driver.prototype.halt = function start(callback) {
  callback();
};

Driver.prototype.handleSDLEvent = function handleSDLEvent(event) {
  switch (event.type) {
    case 'JOYAXISMOTION':
      var axis = this.findInConfig('axis', event.axis);
      this.device.emit(axis + ":move", event.value);
      break;

    case 'JOYBUTTONDOWN':
      var button = this.findInConfig('buttons', event.button);
      this.device.emit(button + ":press");
      break;

    case 'JOYBUTTONUP':
      var button = this.findInConfig('buttons', event.button);
      this.device.emit(button + ":release");
      break;
  }
};

Driver.prototype.findInConfig = function findInConfig(type, id) {
  for (var a = 0; a < this.config[type].length; a++) {
    var thing = this.config[type][a];

    if (thing.id === id) {
      return thing.name
    }
  }

  return null;
};
