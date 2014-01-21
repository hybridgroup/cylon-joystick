/*
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var DualShock, namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = require('node-namespace');

  require('../cylon-joystick');

  DualShock = require('dualshock-controller');

  namespace("Cylon.Adaptors.Joystick", function() {
    return this.DualShock3 = (function(_super) {
      __extends(DualShock3, _super);

      function DualShock3(opts) {
        if (opts == null) {
          opts = {};
        }
        if (opts.initialize == null) {
          opts.initialize = true;
        }
        this.joystick = null;
        DualShock3.__super__.constructor.apply(this, arguments);
        if (opts.initialize) {
          this.connectToController();
        }
      }

      DualShock3.prototype.connectToController = function() {
        this.connector = this.joystick = DualShock();
        return this.proxyMethods(this.commands(), this.joystick, this);
      };

      DualShock3.prototype.connect = function(callback) {
        var button, buttons, dir, state, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        buttons = ["r1", "l1", "r2", "l2", "start", "select", "x", "triangle", "circle", "square"];
        _ref = ['press', 'release'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          state = _ref[_i];
          this.defineAdaptorEvent({
            eventName: "psxButton:" + state,
            targetEventName: "psbutton:" + state
          });
          for (_j = 0, _len1 = buttons.length; _j < _len1; _j++) {
            button = buttons[_j];
            this.defineAdaptorEvent({
              eventName: "" + button + ":" + state
            });
          }
          this.defineAdaptorEvent({
            eventName: "leftAnalogBump:" + state,
            targetEventName: "left:" + state
          });
          this.defineAdaptorEvent({
            eventName: "rightAnalogBump:" + state,
            targetEventName: "right:" + state
          });
          _ref1 = ["Up", "Down", "Left", "Right"];
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            dir = _ref1[_k];
            this.defineAdaptorEvent({
              eventName: "dpad" + dir + ":" + state,
              targetEventName: "dpad:" + (dir.toLowerCase()) + ":" + state
            });
          }
        }
        this.defineAdaptorEvent({
          eventName: 'left:move'
        });
        this.defineAdaptorEvent({
          eventName: 'right:move'
        });
        this.joystick.connect();
        return DualShock3.__super__.connect.apply(this, arguments);
      };

      return DualShock3;

    })(Cylon.Adaptor);
  });

}).call(this);
