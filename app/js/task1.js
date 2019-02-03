;(function() {
  'use strict';

  var transport = {
    stop: null
  };

  var car = {
    stop: true
  };
  car.__proto__ = transport;

  console.log(car.stop); // true, потому что у объекта car есть свойство stop со значением true
  delete car.stop;
  console.log(car.stop); // null, потому что transport прототип car, а его stop со значением null
  delete transport.stop;
  console.log(car.stop); // undefined, потому что ни у объекта, ни у прототипа (и ни у прототипа прототипа) нет свойства stop
}());