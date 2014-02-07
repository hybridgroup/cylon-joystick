'use strict'

driver = source "drivers/xbox360"

describe "Cylon.Drivers.Joystick.Xbox360", ->
  joystick = new Cylon.Drivers.Joystick.Xbox360
    name: 'stick'
    device: { connection: 'connect' }

  it "needs tests"
