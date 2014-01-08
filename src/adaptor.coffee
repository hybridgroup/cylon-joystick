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
XboxController = require 'xbox-controller'

namespace "Cylon.Adaptors", ->
  class @Joystick extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @connector = @joystick = new XboxController
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

    disconnect: ->
      @joystick.setLed 0x00
      @joystick.rumble(0, 0)
      super
