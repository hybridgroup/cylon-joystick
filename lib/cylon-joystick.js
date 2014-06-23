/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Logger = require('cylon').Logger;

var Adaptor = require('./adaptor');

var Drivers = {
  'dualshock-3': require('./drivers/dualshock_3')
};

module.exports = {
  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    for (var d in Drivers) {
      if (opts.name === d) {
        return new Drivers[d](opts);
      }
    }

    throw new Error("Invalid joystick type.")
  },

  register: function(robot) {
    Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);

    robot.registerAdaptor('cylon-joystick', 'joystick');

    for (var d in Drivers) {
      robot.registerDriver('cylon-joystick', d);
    }
  }
};
