/*
 * Cylon.js Xbox 360 Joystick driver
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
    return this.Xbox360 = (function(_super) {
      __extends(Xbox360, _super);

      function Xbox360(opts) {
        if (opts == null) {
          opts = {};
        }
        Xbox360.__super__.constructor.apply(this, arguments);
        this.proxyMethods(this.commands(), this.connection, this);
      }

      Xbox360.prototype.commands = function() {
        return ["rumble", "setLed"];
      };

      Xbox360.prototype.start = function(callback) {
        var button, buttons, _i, _len;
        buttons = ["dpad:up", "dpad:down", "dpad:left", "dpad:right", "xboxbutton", "start", "back", "left", "right", "leftshoulder", "rightshoulder", "a", "b", "x", "y"];
        for (_i = 0, _len = buttons.length; _i < _len; _i++) {
          button = buttons[_i];
          this.defineDriverEvent({
            eventName: "" + button + ":press"
          });
          this.defineDriverEvent({
            eventName: "" + button + ":release"
          });
        }
        this.defineDriverEvent({
          eventName: 'lefttrigger'
        });
        this.defineDriverEvent({
          eventName: 'righttrigger'
        });
        this.defineDriverEvent({
          eventName: 'left:move'
        });
        this.defineDriverEvent({
          eventName: 'right:move'
        });
        return Xbox360.__super__.start.apply(this, arguments);
      };

      return Xbox360;

    })(Cylon.Driver);
  });

}).call(this);
