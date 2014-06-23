/*
 * cylon-joystick DualShock 3 Driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Config = require('../config/dualshock_3');

var DualShock3 = module.exports = function DualShock3(opts) {
  if (opts == null) {
    opts = {};
  }

  this.config = Config;

  DualShock3.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(DualShock3, Cylon.Driver);
