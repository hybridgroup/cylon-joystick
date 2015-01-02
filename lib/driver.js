/*
 * cylon-joystick Driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.controllerId = null;

  this.config = require(opts.config);

  this.vendorID = this.config.vendorID;
  this.productID = this.config.productID;
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

/**
 * Starts event handlers for the gamepad
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Driver.prototype.start = function(callback) {
  this.handleJoystickEvents();

  var devices = this.connection.getDevices();

  // assign first controller matching description
  for (var i = 0 ; i < devices.length ; i++) {
    var d = devices[i];

    var match = (
      d.productID.toString() === this.productID.toString() &&
      d.vendorID.toString() === this.vendorID.toString()
    );

    if (match) {
      this.controllerId = d.deviceID;
      break;
    }
  }

  callback();
};

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Sets up handling of joystick events, dynamically generating events based on
 * controller configuration
 *
 * @return {null}
 */
Driver.prototype.handleJoystickEvents = function() {
  this.connection.on("move", function(id, axis, value) {
    if (id !== this.controllerId) {
      return;
    }

    var name = this.findInConfig("axis", axis);
    this.emit(name + ":move", value);
  }.bind(this));

  this.connection.on("down", function(id, num) {
    if (id !== this.controllerId) {
      return;
    }

    var name = this.findInConfig("buttons", num);
    this.emit(name + ":press");
  }.bind(this));

  this.connection.on("up", function(id, num) {
    if (id !== this.controllerId) {
      return;
    }

    var name = this.findInConfig("buttons", num);
    this.emit(name + ":release");
  }.bind(this));
};

Driver.prototype.findInConfig = function(type, id) {
  for (var a = 0; a < this.config[type].length; a++) {
    var thing = this.config[type][a];

    if (thing.id === id) {
      return thing.name;
    }
  }

  return null;
};
