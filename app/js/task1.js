;(function() {
  'use strict';

  var transport = {
    stop: null
  };

  var car = {
    stop: true
  };
  car.__proto__ = transport;

  console.log(car.stop); // true
  delete car.stop;
  console.log(car.stop); // null
  delete transport.stop;
  console.log(car.stop); // undefined
}());