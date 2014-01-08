###
 * Cylonjs Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require './cylon-joystick'
require './xbox360'

namespace "Cylon.Adaptors", ->
  class @Joystick extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      console.log opts
      @connector = @joystick = new Cylon.Drivers.Joystick.Xbox360(opts)
      @proxyMethods @commands(), @joystick, this

    commands: ->
      ["rumble", "setLed"]

    connect: (callback) ->
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
        @defineAdaptorEvent eventName: "#{button}:press"
        @defineAdaptorEvent eventName: "#{button}:release"

      @defineAdaptorEvent eventName: 'lefttrigger'
      @defineAdaptorEvent eventName: 'righttrigger'
      @defineAdaptorEvent eventName: 'left:move'
      @defineAdaptorEvent eventName: 'right:move'

      super
