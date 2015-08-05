"use strict";

var Adaptor = require("./lib/adaptor"),
    Driver = require("./lib/driver");

var path = require("path");

var Drivers = {
  "dualshock-4": path.join(__dirname, "/lib/config/dualshock_4.json"),
  "dualshock-3": path.join(__dirname, "/lib/config/dualshock_3.json"),
  "xbox-360": path.join(__dirname, "/lib/config/xbox_360.json")
};

module.exports = {
  adaptors: ["joystick"],
  drivers: ["dualshock-3", "dualshock-4", "xbox-360", "joystick"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    if (Drivers[opts.driver]) {
      opts.config = Drivers[opts.driver];
    }

    return new Driver(opts);
  }
};
