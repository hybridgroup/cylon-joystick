/*
 * cylon-joystick Driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2016 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.controllerId = null;

  this.config = require(opts.config);

  this.vendorID = opts.vendorID || this.config.vendorID;
  this.productID = opts.vendorID || this.config.productID;
  this.description = opts.description || this.config.description;
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

/**
 * Starts event handlers for the gamepad
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Driver.prototype.start = function(callback) {
  this.handleJoystickEvents();

  var devices = this.connection.getDevices();

  // assign first controller matching description
  for (var i = 0; i < devices.length; i++) {
    var d = devices[i];

    var match = (
      d.productID.toString() === this.productID.toString() &&
      d.vendorID.toString() === this.vendorID.toString() &&
      d.description === this.description
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
 * @return {void}
 */
Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Sets up handling of joystick events, dynamically generating events based on
 * controller configuration
 *
 * @return {void}
 */
Driver.prototype.handleJoystickEvents = function() {
  this.connection.on("move", function(id, axis, value) {
    if (id !== this.controllerId) {
      return;
    }

    var name = this.findInConfig("axis", axis);
    this.emit(name + ":move", value);
  }.bind(this));

  ["up", "down"].forEach(this._handleButtonEvent.bind(this));
};

Driver.prototype._handleButtonEvent = function(event) {
  var action = event === "up" ? ":release" : ":press";

  this.connection.on(event, function(id, num) {
    if (id !== this.controllerId) {
      return;
    }

    var name = this.findInConfig("buttons", num);
    this.emit(name + action);
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
