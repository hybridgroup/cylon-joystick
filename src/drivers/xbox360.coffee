###
 * Cylon.js Xbox 360 Joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require '../cylon-joystick'

namespace "Cylon.Drivers.Joystick", ->
  class @Xbox360 extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @proxyMethods @commands(), @connection, this

    commands: ->
      ["rumble", "setLed"]

    start: (callback) ->
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

      for button in buttons
        @defineDriverEvent eventName: "#{button}:press"
        @defineDriverEvent eventName: "#{button}:release"

      @defineDriverEvent eventName: 'lefttrigger'
      @defineDriverEvent eventName: 'righttrigger'
      @defineDriverEvent eventName: 'left:move'
      @defineDriverEvent eventName: 'right:move'

      super
