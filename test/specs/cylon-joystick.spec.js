"use strict";

var joystick = source("cylon-joystick");

describe("Cylon.Joystick", function() {
  it("can register", function() {
    expect(joystick.register).to.be.a('function');
  });

  it("can create an adaptor", function() {
    expect(joystick.adaptor).to.be.a('function');
  });

  it("can create a driver", function() {
    expect(joystick.driver).to.be.a('function');
  });
});
