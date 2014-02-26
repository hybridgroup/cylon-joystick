var Cylon = require('cylon');

Cylon.robot({
  name: "NewBot",

  connection: {
    name: 'joystick',
    adaptor: 'joystick',
    controller: 'xbox360'
  },

  device: {
    name: 'controller',
    driver: 'xbox360'
  },

  work: function(my) {
    var button_states = ["press", "release"];
    var buttons = [
      "a",
      "b",
      "x",
      "y",

      "leftshoulder",
      "rightshoulder",

      "left",
      "right",

      "back",
      "start",

      "dpad:left",
      "dpad:right",
      "dpad:up",
      "dpad:down",

      "xboxbutton"
    ];

    buttons.forEach(function(button) {
      button_states.forEach(function(state) {
        my.controller.on(button + ":" + state, function() {
          console.log(button, state);
        });
      });
    });

    my.controller.on("left:move", function(pos) {
      console.log("left:", pos);
    });

    my.controller.on("right:move", function(pos) {
      console.log("right:", pos);
    });

    my.controller.on("righttrigger", function(pos) {
      console.log("right trigger:", pos);
    });

    my.controller.on("lefttrigger", function(pos) {
      console.log("left trigger:", pos);
    });
  }
});

Cylon.start();
