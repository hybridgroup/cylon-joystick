###
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'
XboxController = require 'xbox-controller'

require '../cylon-joystick'

namespace "Cylon.Adaptors.Joystick", ->
  class @Xbox360 extends Cylon.Adaptor
    constructor: (opts = {}) ->
      type = opts.extraParams.type || "controller"
      opts.initialize ?= true
      @joystick = null
      super
      @connectToController(type) if opts.initialize

    connectToController: (type) ->
      @connector = @joystick = new XboxController(type)
      @proxyMethods @commands(), @joystick, this

    commands: ->
      ["rumble", "setLed"]

    connect: (callback) ->
      buttons = [
        "xboxbutton",

        "start",
        "back",

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

      for event in ["press", "release"]
        for dir in ["up", "down", "left", "right"]
          @defineAdaptorEvent
            eventName: "d#{dir}:#{event}"
            targetEventName: "dpad:#{dir}:#{event}"

        for dir in ["left", "right"]
          @defineAdaptorEvent
            eventName: "#{dir}stick:#{event}"
            targetEventName: "#{dir}:#{event}"

      @defineAdaptorEvent eventName: 'lefttrigger'
      @defineAdaptorEvent eventName: 'righttrigger'
      @defineAdaptorEvent eventName: 'left:move'
      @defineAdaptorEvent eventName: 'right:move'

      super

    disconnect: ->
      @joystick.setLed 0x00
      @joystick.rumble(0, 0)
      super
