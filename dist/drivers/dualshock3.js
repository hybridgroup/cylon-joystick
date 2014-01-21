/*
 * Cylon.js DualShock 3 Joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = require('node-namespace');

  require('../cylon-joystick');

  namespace("Cylon.Drivers.Joystick", function() {
    return this.DualShock3 = (function(_super) {
      __extends(DualShock3, _super);

      function DualShock3(opts) {
        if (opts == null) {
          opts = {};
        }
        DualShock3.__super__.constructor.apply(this, arguments);
        this.proxyMethods(this.commands(), this.connection, this);
      }

      DualShock3.prototype.start = function(callback) {
        var button, buttons, state, _i, _j, _len, _len1, _ref;
        buttons = ["r1", "l1", "r2", "l2", "start", "select", "x", "triangle", "circle", "square", "left", "right", "dpad:left", "dpad:right", "dpad:up", "dpad:down", "psbutton"];
        _ref = ['press', 'release'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          state = _ref[_i];
          for (_j = 0, _len1 = buttons.length; _j < _len1; _j++) {
            button = buttons[_j];
            this.defineDriverEvent({
              eventName: "" + button + ":" + state
            });
          }
        }
        this.defineDriverEvent({
          eventName: 'left:move'
        });
        this.defineDriverEvent({
          eventName: 'right:move'
        });
        return DualShock3.__super__.start.apply(this, arguments);
      };

      return DualShock3;

    })(Cylon.Driver);
  });

}).call(this);
