/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __slice = [].slice;

  namespace = require('node-namespace');

  require('cylon');

  require('./adaptors/xbox360');

  require('./drivers/xbox360');

  require('./adaptors/dualshock3');

  require('./drivers/dualshock3');

  module.exports = {
    adaptor: function() {
      var args, controller;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      controller = String(args[0].extraParams.controller).toLowerCase();
      switch (controller) {
        case 'xbox360':
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(Cylon.Adaptors.Joystick.Xbox360, args, function(){});
        case 'dualshock3':
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(Cylon.Adaptors.Joystick.DualShock3, args, function(){});
        case 'undefined':
          throw new Error("No controller type passed to connection.");
      }
    },
    driver: function() {
      var args, driver;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      driver = String(args[0].name).toLowerCase();
      switch (driver) {
        case "xbox360":
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(Cylon.Drivers.Joystick.Xbox360, args, function(){});
        case "dualshock3":
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(Cylon.Drivers.Joystick.DualShock3, args, function(){});
      }
    },
    register: function(robot) {
      Logger.debug("Registering Joystick adaptor and drivers for " + robot.name);
      robot.registerAdaptor('cylon-joystick', 'xbox360');
      robot.registerAdaptor('cylon-joystick', 'dualshock3');
      robot.registerDriver('cylon-joystick', 'xbox360');
      return robot.registerDriver('cylon-joystick', 'dualshock3');
    }
  };

}).call(this);
