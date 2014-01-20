Cylon = require 'cylon'

Cylon.robot
  name: "NewBot"
  connection: { name: 'joystick', adaptor: 'joystick', controller: 'dualshock3' }
  device: { name: 'controller', driver: 'dualshock3' }

  work: (my) ->
    buttons = [
      "dpad:up",
      "dpad:down",
      "dpad:left",
      "dpad:right",

      "psxbutton",

      "start",
      "select",

      "leftstick",
      "rightstick",

      "l1",
      "r1",

      "l2",
      "r2",

      "x",
      "circle",
      "triangle",
      "square"
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
