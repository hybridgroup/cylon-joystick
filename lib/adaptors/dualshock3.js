/*
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

require('../cylon-joystick');

var DualShock = require('dualshock-controller'),
    namespace = require('node-namespace');

namespace("Cylon.Adaptors.Joystick", function() {
  this.DualShock3 = (function(klass) {
    subclass(DualShock3, klass);

    function DualShock3(opts) {
      if (opts == null) { opts = {}; }
      if (opts.initialize == null) { opts.initialize = true; }

      this.joystick = null;

      DualShock3.__super__.constructor.apply(this, arguments);

      if (opts.initialize) { this.connectToController(); }
    }

    DualShock3.prototype.connectToController = function() {
      this.connector = this.joystick = DualShock();
      return this.proxyMethods(this.commands(), this.joystick, this);
    };

    DualShock3.prototype.connect = function(callback) {
      var buttons = [
        "r1",
        "l1",

        "r2",
        "l2",

        "start",
        "select",

        "x",
        "triangle",
        "circle",
        "square"
      ];

      var states = ['press', 'release'];

      for (var i = 0; i < states.length; i++) {
        var state = states[i];

        for (var x = 0; x < buttons.length; x++) {
          this.defineAdaptorEvent({ eventName: buttons[x] + ":" + state });
        }

        this.defineAdaptorEvent({
          eventName: "psxButton:" + state,
          targetEventName: "psbutton:" + state
        });

        this.defineAdaptorEvent({
          eventName: "leftAnalogBump:" + state,
          targetEventName: "left:" + state
        });

        this.defineAdaptorEvent({
          eventName: "rightAnalogBump:" + state,
          targetEventName: "right:" + state
        });

        var dirs = ["Up", "Down", "Left", "Right"];

        for (var y = 0; y < dirs.length; y++) {
          var dir = dirs[y];

          this.defineAdaptorEvent({
            eventName: "dpad" + dir + ":" + state,
            targetEventName: "dpad:" + dir.toLowerCase() + ":" + state,
          });
        }
      }

      this.defineAdaptorEvent({ eventName: 'left:move' });
      this.defineAdaptorEvent({ eventName: 'right:move' });

      this.joystick.connect();

      return DualShock3.__super__.connect.apply(this, arguments);
    };

    return DualShock3;

  })(Cylon.Adaptor);
});

module.exports = Cylon.Adaptors.Joystick.DualShock3;
