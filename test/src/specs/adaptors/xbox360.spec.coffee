'use strict'

adaptor = source "adaptors/xbox360"

describe "Cylon.Adaptors.Joystick", ->
  keyboard = new Cylon.Adaptors.Joystick.Xbox360
    initialize: false

  it "needs tests"
