/*
 * Cylong XBox360 joystick driver
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

  require('./cylon-joystick');

  namespace("Cylon.Drivers.Joystick", function() {
    return this.Xbox360 = (function(_super) {
      __extends(Xbox360, _super);

      function Xbox360(opts) {
        Xbox360.__super__.constructor.apply(this, arguments);
      }

      return Xbox360;

    })(Cylon.Driver);
  });

}).call(this);
