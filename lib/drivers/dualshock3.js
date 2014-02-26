/*
 * Cylon.js DualShock 3 Joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var namespace = require('node-namespace');

require('../cylon-joystick');

namespace("Cylon.Drivers.Joystick", function() {
  this.DualShock3 = (function(klass) {
    subclass(DualShock3, klass);

    function DualShock3(opts) {
      if (opts == null) { opts = {}; }
      DualShock3.__super__.constructor.apply(this, arguments);
      this.proxyMethods(this.commands(), this.connection, this);
    }

    DualShock3.prototype.start = function(callback) {
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
        "square",

        "left",
        "right",

        "dpad:left",
        "dpad:right",
        "dpad:up",
        "dpad:down",

        "psbutton"
      ];

      var states = ["press", "release"];

      for (var s = 0; s < states.length; s++) {
        var state = states[s];

        for (var b = 0; b < buttons.length; b++) {
          var button = buttons[b];
          this.defineDriverEvent({ eventName: button + ":" + state });
        }
      }

      this.defineDriverEvent({ eventName: 'left:move' });
      this.defineDriverEvent({ eventName: 'right:move' });

      return DualShock3.__super__.start.apply(this, arguments);
    };

    return DualShock3;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.Joystick.DualShock3;
