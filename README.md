# Cylon.js for Joysticks and Controllers

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the adaptor/driver for communicating with joysticks and game controllers. It can be used with any [SDL][http://www.libsdl.org/]-compatible controller.

Default bindings are provided for the Xbox 360, DualShock 3, DualShock 4, and Logitech F310 controllers.

The cylon-gamepad implementation is made possible by the gamepad module [https://github.com/creationix/node-gamepad](https://github.com/creationix/node-gamepad) created by [@creationix](https://github.com/creationix) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-joystick.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-joystick) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-joystick/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-joystick) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-joystick/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-joystick)

## How to Install
Installing Cylon.js with Joystick support is pretty easy.

    $ npm install cylon cylon-joystick

### Note

- OS X does not provide native support for Xbox 360 controllers. As such, a [third-party driver is required](https://github.com/d235j/360Controller/releases).
- If you're using a PS3 controller and want to communicate with it over USB, plug it in and then press the PlayStation button to make sure it's connected.

## How to Use

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    controller: { driver: 'dualshock-3' }
  },

  work: function(my) {
    ["square", "circle", "x", "triangle"].forEach(function(button) {
      my.controller.on(button + ":press", function() {
        console.log("Button " + button + " pressed.");
      });

      my.controller.on(button + ":release", function() {
        console.log("Button " + button + " released.");
      });
    });

    my.controller.on("left_x:move", function(pos) {
      console.log("Left Stick - X:", pos);
    });

    my.controller.on("right_x:move", function(pos) {
      console.log("Right Stick - X:", pos);
    });

    my.controller.on("left_y:move", function(pos) {
      console.log("Left Stick - Y:", pos);
    });

    my.controller.on("right_y:move", function(pos) {
      console.log("Right Stick - Y:", pos);
    });
  }
}).start();
```

## How to Connect

Plug your USB joystick or game controller into your USB port.
If your device is supported by SDL, you are now ready.

## Custom joysticks

If you don't have one of the joysticks we support natively, or want to make changes to the configuration, `cylon-joystick` supports custom bindings.

To use a custom joystick with Cylon, simply supply the joystick bindings file when you're describing the device:

```javascript
var Cylon = require('cylon');

var config = __dirname + "/controller.json"

Cylon.robot({
  connections: {
    joystick: { adaptor: 'joystick' }
  },

  devices: {
    controller: { driver: "joystick", config: config }
  },

  work: function(my) {
    // your custom mappings will be reflected here as events
  }
}).start();
```

A joystick bindings file needs to contain the device's `productID`, `vendorID`, and `description`, as this is how cylon-joystick will find the appropriate device.

For an example of what a bindings file should look like, [here is the Xbox 360 controller bindings file we use][xbox-bindings].

[xbox-bindings]: https://github.com/hybridgroup/cylon-joystick/blob/master/lib/config/xbox_360.json

If you are using a "white-label" version of a particular gamepad, you can override the `productID`, `vendorID`, and/or `description` so you can use an existing mapping. For example, a PS3 compatible gamepad that uses the same `vendorID` & `productID`, but a different name, you could use the existing Dualshock 3 mapping as follows:

```javascript
  devices: {
    controller: { driver: 'dualshock-3', description: 'Coolstick 5000' }
  },
```

## `cylon-joystick-explorer`

`cylon-joystick` includes the `cylon-joystick-explorer` binary.
It's useful for figuring out what compatible gamepads you have connected, as well as making it easier to generate custom bindings JSON files.

For best use, install `cylon-joystick` globally:

    $ npm install -g cylon-joystick

Then just run the command:

    $ cylon-joystick-explorer

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-joystick/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-joystick/blob/master/RELEASES.md
).

## License

Copyright (c) 2013-2016 The Hybrid Group. Licensed under the Apache 2.0 license.
