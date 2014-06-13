# Cylon.js For Joysticks and Game Controllers

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon adaptor for the Xbox 360 controller, and for the Dualshock 3 (PS3) controller. It depends heavily on the https://github.com/andrew/node-xbox-controller module, thanks [@andrew](https://github.com/andrew), and on the https://github.com/rdepena/node-dualshock-controller module, thanks [@rdepena](https://github.com/rdepena)!

The goal is to also support any other joysticks and game controllers that are HID devices.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-joystick.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-joystick)

## Getting Started
Install the module with: `npm install cylon-joystick`

## Notes:

You'll need to install OS X Drivers for the Xbox 360 Controller from http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/OsxDriver if you want to use it with your Mac.

If you're using a PS3 controller and want to communicate with it over USB, plug it in and then press the PlayStation button. Otherwise, it won't emit any data.

## Examples

### JavaScript

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'joystick', adaptor: 'joystick', controller: 'xbox360' },
  device: {name: 'joystick', driver: 'xbox360'},

  work: function(my) {
    my.joystick.on("left:move", function(position) { 
      console.log(position);
    });
  }
}).start();
```

### CoffeeScript

```
Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'joystick', adaptor: 'joystick', controller: 'xbox360'

  device:
    name: 'joystick', driver: 'xbox360'

  work: (my) ->
    my.joystick.on "left:move", (position) ->
      console.log position

.start()
```

## Third-Party Controllers

For Xbox 360 third-party controllers, you may need to supply part of the name to
the `connection` so that our driver can find your controller correctly. To find
out the name of the controller, you can run [this script](https://gist.github.com/stewart/9011885).

Example:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: {
    name: 'joystick',
    adaptor: 'joystick',
    controller: 'xbox360',
    type: 'afterglow' // <= lets cylon-joystick connect to your controller
  },

  device: { name: 'joystick', driver: 'xbox360' },

  work: function(my) {
    my.joystick.on("left:move", function(position) { 
      console.log(position);
    });
  }
}).start();
```

Third party controller support for PS3 is pending.

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

Version 0.6.0 - Compatibility with Cylon 0.15.0

Version 0.5.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.4.0 - Update for Cylon.js 0.12.0

Version 0.3.0 - Update for Cylon.js 0.11.0, refactor into pure JavaScript

Version 0.2.0 - Update for Cylon.js 0.10.0, add support for Dualshock 3

Version 0.1.0 - Initial release

## License

Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
