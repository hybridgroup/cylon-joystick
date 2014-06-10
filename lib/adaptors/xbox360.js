/*
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon'),
    XboxController = require('xbox-controller');

var Xbox360 = module.exports = function Xbox360(opts) {
  if (opts == null) { opts = {}; }
  opts.extraParams || (opts.extraParams = {});
  var type = opts.extraParams.type || "controller";

  if (opts.initialize == null) { opts.initialize = true; }

  this.joystick = null;

  Xbox360.__super__.constructor.apply(this, arguments);

  if (opts.initialize) { this.connectToController(type); }
};

Cylon.Utils.subclass(Xbox360, Cylon.Adaptor)

Xbox360.prototype.connectToController = function(type) {
  this.connector = this.joystick = new XboxController(type);
  return this.proxyMethods(this.commands, this.joystick, this);
};

Xbox360.prototype.commands = ["rumble", "setLed"];

Xbox360.prototype.connect = function(callback) {
  var events = ["press", "release"];

  for (var e = 0; e < events.length; e++) {
    var event = events[e],
        i = 0;

    var buttons = [
      "xboxbutton",

      "start",
      "back",

      "leftshoulder",
      "rightshoulder",

      "a",
      "b",
      "x",
      "y"
    ];

    for (i = 0; i < buttons.length; i++) {
      this.defineAdaptorEvent({ eventName: buttons[i] + ":" + event });
    }

    var dirs = ["up", "down", "left", "right"];

    for (i = 0; i < dirs.length; i++) {
      var dir = dirs[i];

      this.defineAdaptorEvent({
        eventName: "d" + dir + ":" + event,
        targetEventName: "dpad:" + dir + ":" + event
      });
    }

    var dirs = ["left", "right"];

    for (i = 0; i < dirs.length; i++) {
      var dir = dirs[i];

      this.defineAdaptorEvent({
        eventName: dir + "stick:" + event,
        targetEventName: dir + ":" + event
      });
    }
  }

  this.defineAdaptorEvent({
    eventName: 'lefttrigger'
  });

  this.defineAdaptorEvent({
    eventName: 'righttrigger'
  });

  this.defineAdaptorEvent({
    eventName: 'left:move'
  });

  this.defineAdaptorEvent({
    eventName: 'right:move'
  });

  return Xbox360.__super__.connect.apply(this, arguments);
};

Xbox360.prototype.disconnect = function() {
  this.joystick.setLed(0x00);
  this.joystick.rumble(0, 0);
  return Xbox360.__super__.disconnect.apply(this, arguments);
};
