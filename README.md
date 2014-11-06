# Cylon.js For Joysticks and Game Controllers

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Joystick adaptor, for use with any
[SDL][]-compatible game controller. Bindings are provided for the Xbox 360 and
DualShock 3 controllers by default.

[SDL]: http://www.libsdl.org/

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-joystick.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-joystick) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-joystick/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-joystick) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-joystick/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-joystick)

## Getting Started

To get started with cylon-joystick, you'll need to have the SDL libraries
installed.

### Linux (apt-get)

    $ sudo add-apt-repository -y ppa:zoogie/sdl2-snapshots
    $ sudo apt-get update
    $ sudo apt-get install libsdl2-dev libsdl2-image-dev libsdl2-ttf-dev libsdl2

### OS X

    $ brew install sdl2 sdl2_image sdl2_ttf

Mac OS X does not provide native support for Xbox 360 controllers.
A third-party driver is available [here](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/OsxDriver).

If you're running a different setup, please consult your package manager's
documentation.

Install the module with: `npm install cylon-joystick`

## Notes:

If you're using a PS3 controller and want to communicate with it over USB, plug
it in and then press the PlayStation button to make sure it's connected.

## Examples

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'joystick', adaptor: 'joystick' },
  device: { name: 'controller', driver: 'dualshock-3' },

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
});

Cylon.start();
```

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.11.0 - Compatibility with Cylon 0.20.0

Version 0.10.0 - Compatibility with Cylon 0.19.0

Version 0.9.0 - Update SDL dependency

Version 0.8.0 - Compatibility with Cylon 0.18.0

Version 0.7.0 - Compatibility with Cylon 0.16.0

Version 0.6.1 - Add peerDependencies to package.json

Version 0.6.0 - Compatibility with Cylon 0.15.0

Version 0.5.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.4.0 - Update for Cylon.js 0.12.0

Version 0.3.0 - Update for Cylon.js 0.11.0, refactor into pure JavaScript

Version 0.2.0 - Update for Cylon.js 0.10.0, add support for Dualshock 3

Version 0.1.0 - Initial release

## License

Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
