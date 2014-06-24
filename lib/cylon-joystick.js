/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Logger = require('cylon').Logger;

var Adaptor = require('./adaptor'),
    Driver = require('./driver');

var Drivers = {
  'dualshock-3': __dirname + '/config/dualshock_3.json',
  'xbox-360': __dirname + '/config/xbox_360.json'
};

module.exports = {
  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    for (var d in Drivers) {
      if (opts.name === d) {
        opts.extraParams.config = Drivers[d];
      }
    }

    return new Driver(opts);
  },

  register: function(robot) {
    Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);

    robot.registerAdaptor('cylon-joystick', 'joystick');

    for (var d in Drivers) {
      robot.registerDriver('cylon-joystick', d);
    }

    robot.registerDriver('cylon-joystick', 'custom-joystick');
  }
};
