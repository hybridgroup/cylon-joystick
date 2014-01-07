###
 * Cylong XBox360 joystick driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'
require './cylon-joystick'

namespace "Cylon.Drivers.Joystick", ->
  class @Xbox360 extends Cylon.Driver
    start: (callback) ->
      @defineDriverEvent eventName: 'a:press'
      @defineDriverEvent eventName: 'b:press'
      @defineDriverEvent eventName: 'lefttrigger'
      @defineDriverEvent eventName: 'righttrigger'
      @defineDriverEvent eventName: 'left:move'
      @defineDriverEvent eventName: 'right:move'

      super
