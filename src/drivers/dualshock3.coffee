###
 * Cylon.js DualShock 3 Joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require '../cylon-joystick'

namespace "Cylon.Drivers.Joystick", ->
  class @DualShock3 extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @proxyMethods @commands(), @connection, this

    start: (callback) ->
      buttons = [
        "r1",
        "l1",

        "r2",
        "l2",

        "start",
        "select",

        "x",
        "triangle",
        "circle",
        "square",

        "left",
        "right",

        "dpad:left",
        "dpad:right",
        "dpad:up",
        "dpad:down",

        "psbutton"
      ]

      for state in ['press', 'release']
        for button in buttons
          @defineDriverEvent eventName: "#{button}:#{state}"

      @defineDriverEvent eventName: 'left:move'
      @defineDriverEvent eventName: 'right:move'

      super
