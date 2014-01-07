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
        this.joystick = new XboxController;
        this.connector = this.joystick;
      }

      return Joystick;

    })(Cylon.Adaptor);
  });

}).call(this);
