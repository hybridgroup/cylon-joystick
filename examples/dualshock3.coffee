Cylon = require 'cylon'

Cylon.robot
  name: "NewBot"
  connection: { name: 'joystick', adaptor: 'joystick', controller: 'dualshock3' }
  device: { name: 'controller', driver: 'dualshock3' }

  work: (my) ->
    button_states = ["press", "release"]

    buttons = [
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
    ]

    buttons.forEach (button) ->
      button_states.forEach (state) ->
        my.controller.on "#{button}:#{state}", ->
          console.log button, state

    my.controller.on "left:move", (pos) ->
      console.log "left:", pos

    my.controller.on "right:move", (pos) ->
      console.log "right:", pos

Cylon.start()
