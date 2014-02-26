/*
 * Cylon.js Xbox 360 Joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var namespace = require('node-namespace');

require('../cylon-joystick');

namespace("Cylon.Drivers.Joystick", function() {
  this.Xbox360 = (function(klass) {
    subclass(Xbox360, klass);

    function Xbox360(opts) {
      if (opts == null) { opts = {}; }

      Xbox360.__super__.constructor.apply(this, arguments);

      this.proxyMethods(this.commands(), this.connection, this);
    }

    Xbox360.prototype.commands = function() {
      return ["rumble", "setLed"];
    };

    Xbox360.prototype.start = function(callback) {
      var buttons = [
        "dpad:up",
        "dpad:down",
        "dpad:left",
        "dpad:right",

        "xboxbutton",

        "start",
        "back",

        "left",
        "right",

        "leftshoulder",
        "rightshoulder",

        "a",
        "b",
        "x",
        "y"
      ];

      for (var i = 0; i < buttons.length; i++) {
        this.defineDriverEvent({ eventName: buttons[i] + ":press" });
        this.defineDriverEvent({ eventName: buttons[i] + ":release" });
      }

      this.defineDriverEvent({ eventName: 'lefttrigger' });
      this.defineDriverEvent({ eventName: 'righttrigger' });

      this.defineDriverEvent({ eventName: 'left:move' });
      this.defineDriverEvent({ eventName: 'right:move' });

      return Xbox360.__super__.start.apply(this, arguments);
    };

    return Xbox360;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.Joystick.Xbox360;
