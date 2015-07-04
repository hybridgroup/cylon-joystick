"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    joystick: { adaptor: "joystick" }
  },

  devices: {
    controller: { driver: "joystick", config: "./config/logitech-f310" }
  },

  work: function(my) {
    ["a", "b", "x", "y", "left_stick", "right_stick", "left", "right", "back", "start", "pad-left", "pad-right", "pad-up", "pad-down"].forEach(function(button) {
      my.controller.on(button + ":press", function() {
        console.log("Button " + button + " pressed.");
      });

      my.controller.on(button + ":release", function() {
        console.log("Button " + button + " released.");
      });
    });

    my.controller.on("left_x:move", function(pos) {
      console.log("Left Stick - X:", pos);
    });

    my.controller.on("right_x:move", function(pos) {
      console.log("Right Stick - X:", pos);
    });

    my.controller.on("left_y:move", function(pos) {
      console.log("Left Stick - Y:", pos);
    });

    my.controller.on("right_y:move", function(pos) {
      console.log("Right Stick - Y:", pos);
    });

    my.controller.on("left_throttle:move", function(pos) {
      console.log("Left Throttle:", pos);
    });

    my.controller.on("right_throttle:move", function(pos) {
      console.log("Right Throttle:", pos);
    });
  }
});

Cylon.start();
