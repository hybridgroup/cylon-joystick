/*
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var XboxController, namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = require('node-namespace');

  XboxController = require('xbox-controller');

  require('../cylon-joystick');

  namespace("Cylon.Adaptors.Joystick", function() {
    return this.Xbox360 = (function(_super) {
      __extends(Xbox360, _super);

      function Xbox360(opts) {
        var type;
        if (opts == null) {
          opts = {};
        }
        opts.extraParams || (opts.extraParams = {});
        type = opts.extraParams.type || "controller";
        if (opts.initialize == null) {
          opts.initialize = true;
        }
        this.joystick = null;
        Xbox360.__super__.constructor.apply(this, arguments);
        if (opts.initialize) {
          this.connectToController(type);
        }
      }

      Xbox360.prototype.connectToController = function(type) {
        this.connector = this.joystick = new XboxController(type);
        return this.proxyMethods(this.commands(), this.joystick, this);
      };

      Xbox360.prototype.commands = function() {
        return ["rumble", "setLed"];
      };

      Xbox360.prototype.connect = function(callback) {
        var button, buttons, dir, event, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        buttons = ["xboxbutton", "start", "back", "leftshoulder", "rightshoulder", "a", "b", "x", "y"];
        for (_i = 0, _len = buttons.length; _i < _len; _i++) {
          button = buttons[_i];
          this.defineAdaptorEvent({
            eventName: "" + button + ":press"
          });
          this.defineAdaptorEvent({
            eventName: "" + button + ":release"
          });
        }
        _ref = ["press", "release"];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          event = _ref[_j];
          _ref1 = ["up", "down", "left", "right"];
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            dir = _ref1[_k];
            this.defineAdaptorEvent({
              eventName: "d" + dir + ":" + event,
              targetEventName: "dpad:" + dir + ":" + event
            });
          }
          _ref2 = ["left", "right"];
          for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            dir = _ref2[_l];
            this.defineAdaptorEvent({
              eventName: "" + dir + "stick:" + event,
              targetEventName: "" + dir + ":" + event
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

      return Xbox360;

    })(Cylon.Adaptor);
  });

}).call(this);
