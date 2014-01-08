Cylon = require 'cylon'

Cylon.robot
  name: "NewBot"
  connection: { name: 'joystick', adaptor: 'joystick' }
  device: { name: 'controller', driver: 'joystick' }

  work: (my) ->
    buttons = [
      "dup",
      "ddown",
      "dleft",
      "dright",

      "xboxbutton",

      "start",
      "back",

      "leftstick",
      "rightstick",

      "leftshoulder",
      "rightshoulder",

      "a",
      "b",
      "x",
      "y"
    ]

    for button in buttons
      my.controller.on "#{button}:press", (button) ->
        console.log button + " pressed"

      my.controller.on "#{button}:release", (button) ->
        console.log button + " released"

    my.controller.on 'lefttrigger', (position) ->
      console.log "Left Trigger: ", position

    my.controller.on 'righttrigger', (position) ->
      console.log "Right Trigger: ", position

    my.controller.on 'left:move', (position) ->
      console.log "Left Stick: ", position

    my.controller.on 'right:move', (position) ->
      console.log "Right Stick: ", position

Cylon.start()
