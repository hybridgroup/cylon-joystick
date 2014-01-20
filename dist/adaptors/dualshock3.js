/*
 * Cylon.js Xbox 360 Joystick adaptor
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

  namespace("Cylon.Adaptors.Joystick", function() {
    return this.Dualshock3 = (function(_super) {
      __extends(Dualshock3, _super);

      function Dualshock3(opts) {
        if (opts == null) {
          opts = {};
        }
        if (opts.initialize == null) {
          opts.initialize = true;
        }
        this.joystick = null;
        Dualshock3.__super__.constructor.apply(this, arguments);
        if (opts.initialize) {
          this.connectToController();
        }
      }

      Dualshock3.prototype.connectToController = function() {
        this.connector = this.joystick = new XboxController;
        return this.proxyMethods(this.commands(), this.joystick, this);
      };

      return Dualshock3;

    })(Cylon.Adaptor);
  });

}).call(this);
