/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Logger = require('cylon').Logger;

module.exports = {
  adaptor: function(opts) {
  },

  driver: function(opts) {
  },

  register: function(robot) {
    Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);
  }
};
