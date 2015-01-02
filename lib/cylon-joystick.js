/*
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Adaptor = require("./adaptor"),
    Driver = require("./driver");

var Drivers = {
  "dualshock-3": __dirname + "/config/dualshock_3.json",
  "xbox-360": __dirname + "/config/xbox_360.json"
};

module.exports = {
  adaptors: ["joystick"],
  drivers: ["dualshock-3", "xbox-360", "joystick"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    for (var d in Drivers) {
      if (opts.driver === d) {
        opts.config = Drivers[d];
      }
    }

    return new Driver(opts);
  }
};
