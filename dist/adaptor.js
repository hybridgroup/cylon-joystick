/*
 * Cylonjs Joystick adaptor
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

  require('./cylon-joystick');

  XboxController = require('xbox-controller');

  namespace("Cylon.Adaptors", function() {
    return this.Joystick = (function(_super) {
      __extends(Joystick, _super);

      function Joystick(opts) {
        if (opts == null) {
          opts = {};
        }
        Joystick.__super__.constructor.apply(this, arguments);
        this.connector = this.joystick = new XboxController;
        this.proxyMethods(this.commands(), this.joystick, this);
      }

      Joystick.prototype.commands = function() {
        return ["rumble", "setLed"];
      };

      Joystick.prototype.connect = function(callback) {
        var button, buttons, dir, event, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        buttons = ["xboxbutton", "start", "back", "leftstick", "rightstick", "leftshoulder", "rightshoulder", "a", "b", "x", "y"];
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
        return Joystick.__super__.connect.apply(this, arguments);
      };

      Joystick.prototype.disconnect = function() {
        this.joystick.setLed(0x00);
        this.joystick.rumble(0, 0);
        return Joystick.__super__.disconnect.apply(this, arguments);
      };

      return Joystick;

    })(Cylon.Adaptor);
  });

}).call(this);
