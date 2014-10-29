/*
 * cylon-joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var gamepad = require('gamepad');

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.connector = this.joystick = null;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  gamepad.init();

  if (gamepad.numDevices() === 0) {
    throw new Error("No Joysticks available.");
  }

  // process events on a loop
  every(5, gamepad.processEvents);

  // check for new gamepads every half-second
  every(500, gamepad.detectDevices);

  ["attach", "remove", "move", "up", "down"].forEach(function(event) {
    gamepad.on(event, function() {
      var args = [].slice.apply(arguments);
      args.unshift(event);

      this.emit.apply(this, args);
    }.bind(this));
  }.bind(this));

  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};

Adaptor.prototype.getDevices = function() {
  var devices = [];

  for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
    var d = gamepad.deviceAtIndex(i);
    devices.push(d);
  }

  return devices;
};
