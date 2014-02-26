var Cylon = require('cylon');

Cylon.robot({
  name: "NewBot",

  connection: {
    name: 'joystick',
    adaptor: 'joystick',
    controller: 'dualshock3'
  },

  device: {
    name: 'controller',
    driver: 'dualshock3'
  },

  work: function(my) {
    var button_states = ["press", "release"];
    var buttons = [
      "x",
      "square",
      "circle",
      "triangle",

      "l1",
      "r1",

      "l2",
      "r2",

      "left",
      "right",

      "select",
      "start",

      "dpad:left",
      "dpad:right",
      "dpad:up",
      "dpad:down",

      "psbutton"
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
  }
});

Cylon.start();
