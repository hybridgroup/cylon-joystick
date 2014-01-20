###
 * Cylon.js Xbox 360 Joystick adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require '../cylon-joystick'

namespace "Cylon.Adaptors.Joystick", ->
  class @Dualshock3 extends Cylon.Adaptor
    constructor: (opts = {}) ->
      opts.initialize ?= true
      @joystick = null
      super
      do @connectToController if opts.initialize

    connectToController: ->
      @connector = @joystick = new XboxController
      @proxyMethods @commands(), @joystick, this
