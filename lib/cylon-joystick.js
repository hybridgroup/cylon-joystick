/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Xbox360 = {
  Adaptor: require('./adaptors/xbox360'),
  Driver: require('./drivers/xbox360')
};


var Dualshock3 = {
  Adaptor: require('./adaptors/dualshock3'),
  Driver: require('./drivers/dualshock3')
};

module.exports = {
  adaptor: function(opts) {
    var controller = String(opts.extraParams.controller).toLowerCase();

    switch (controller) {
      case "xbox360":
        return new Xbox360.Adaptor(opts);
        break;

      case "dualshock3":
        return new Dualshock3.Adaptor(opts);
        break;

      case 'undefined':
        throw new Error("No controller type passed to connection.");
    }
  },

  driver: function(opts) {
    var driver = String(opts.name).toLowerCase();

    switch (driver) {
      case "xbox360":
        return new Xbox360.Driver(opts);
        break;

      case "dualshock3":
        return new Dualshock3.Driver(opts);
        break;
    }
  },

  register: function(robot) {
    Cylon.Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);

    robot.registerAdaptor('cylon-joystick', 'xbox360');
    robot.registerAdaptor('cylon-joystick', 'dualshock3');

    robot.registerDriver('cylon-joystick', 'xbox360');
    robot.registerDriver('cylon-joystick', 'dualshock3');
  }
};
