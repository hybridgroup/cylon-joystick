Cylon = require 'cylon'

Cylon.robot
  name: "NewBot"
  connection: { name: 'joystick', adaptor: 'joystick', controller: 'xbox360' }
  device: { name: 'controller', driver: 'xbox360' }

  work: (my) ->
    button_states = ["press", "release"]

    buttons = [
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
    ]

    buttons.forEach (button) ->
      button_states.forEach (state) ->
        my.controller.on "#{button}:#{state}", ->
          console.log button, state

    my.controller.on "left:move", (pos) ->
      console.log "left:", pos

    my.controller.on "right:move", (pos) ->
      console.log "right:", pos

    my.controller.on "righttrigger", (pos) ->
      console.log "right trigger:", pos

    my.controller.on "lefttrigger", (pos) ->
      console.log "left trigger:", pos

Cylon.start()
