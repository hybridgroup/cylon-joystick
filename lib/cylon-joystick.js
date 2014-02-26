/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var namespace = require('node-namespace');

require('cylon');

require('./adaptors/xbox360');
require('./drivers/xbox360');

require('./adaptors/dualshock3');
require('./drivers/dualshock3');

module.exports = {
  adaptor: function(opts) {
    var controller = String(opts.extraParams.controller).toLowerCase();

    switch (controller) {
      case "xbox360":
        return new Cylon.Adaptors.Joystick.Xbox360(opts);
      case "dualshock3":
        return new Cylon.Adaptors.Joystick.DualShock3(opts);
      case 'undefined':
        throw new Error("No controller type passed to connection.");
    }
  },

  driver: function(opts) {
    var driver = String(opts.name).toLowerCase();

    switch (driver) {
      case "xbox360":
        return new Cylon.Drivers.Joystick.Xbox360(opts);
      case "dualshock3":
        return new Cylon.Drivers.Joystick.DualShock3(opts);
    }
  },

  register: function(robot) {
    Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);

    robot.registerAdaptor('cylon-joystick', 'xbox360');
    robot.registerAdaptor('cylon-joystick', 'dualshock3');

    robot.registerDriver('cylon-joystick', 'xbox360');
    robot.registerDriver('cylon-joystick', 'dualshock3');
  }
};
