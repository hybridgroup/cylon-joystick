'use strict';

var Cylon = require('cylon');

var Driver = source('drivers/dualshock_3'),
    Config = source('config/dualshock_3');

describe("DualShock3", function() {
  var driver = new Driver({
    device: {}
  });

  it("subclasses Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
  });

  describe("constructor", function() {
    it("loads the configuration JSON into the @config property", function() {
      expect(driver.config).to.be.eql(Config);
    });
  });
});
