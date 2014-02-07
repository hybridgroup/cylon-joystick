'use strict'

driver = source "drivers/dualshock3"

describe "Cylon.Drivers.Joystick.DualShock3", ->
  joystick = new Cylon.Drivers.Joystick.DualShock3
    name: 'stick'
    device: { connection: 'connect' }

  it "needs tests"
