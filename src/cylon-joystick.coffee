###
 * cylon-joystick
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require 'cylon'

require './adaptors/xbox360'
require './drivers/xbox360'

require './adaptors/dualshock3'
require './drivers/dualshock3'

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Joystick.Xbox360(args...)

  driver: (args...) ->
    driver = String(args[0].name).toLowerCase()

    switch driver
      when "xbox360"
        new Cylon.Drivers.Joystick.Xbox360(args...)
      when "dualshock3"
        new Cylon.Drivers.Joystick.Dualshock3(args...)

  register: (robot) ->
    Logger.debug "Registering Joystick adaptor and drivers for #{robot.name}"
    robot.registerAdaptor 'cylon-joystick', 'joystick'

    robot.registerDriver 'cylon-joystick', 'xbox360'
    robot.registerDriver 'cylon-joystick', 'dualshock3'
