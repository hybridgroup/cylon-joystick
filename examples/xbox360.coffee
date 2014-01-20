Cylon = require 'cylon'

Cylon.robot
  name: "NewBot"
  connection: { name: 'joystick', adaptor: 'joystick', controller: 'xbox360' }
  device: { name: 'controller', driver: 'xbox360' }

  work: (my) ->
    buttons = [
      "dpad:up",
      "dpad:down",
      "dpad:left",
      "dpad:right",

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

    buttons.forEach (button) ->
      my.controller.on "#{button}:press", ->
        console.log button + " pressed"

      my.controller.on "#{button}:release", ->
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
