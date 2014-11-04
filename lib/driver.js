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
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  this.config = require(opts.config);
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.connection.on('event', this.handleSDLEvent.bind(this));
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.handleSDLEvent = function(event) {
  var button = null;

  switch (event.type) {
    case 'JOYAXISMOTION':
      var axis = this.findInConfig('axis', event.axis);
      this.device.emit(axis + ":move", event.value);
      break;

    case 'JOYBUTTONDOWN':
      button = this.findInConfig('buttons', event.button);
      this.device.emit(button + ":press");
      break;

    case 'JOYBUTTONUP':
      button = this.findInConfig('buttons', event.button);
      this.device.emit(button + ":release");
      break;
  }
};

Driver.prototype.findInConfig = function(type, id) {
  for (var a = 0; a < this.config[type].length; a++) {
    var thing = this.config[type][a];

    if (thing.id === id) {
      return thing.name;
    }
  }

  return null;
};
