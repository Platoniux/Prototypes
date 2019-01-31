;(function() {
  'use strict';

  function User(name, password, role) {
    this.id = 0;
    this.name = name;
    this.password = password;
    this.role = role;

    this.makeNewId();
  }

  User.prototype.makeNewId = function() {
    this.id = (Math.ceil(Math.PI * (Math.random() * 100)) * 1230);
  };
  
  function Admin(name, password, role) {}
  function Visitor(name, password, role) {}

  const signUpForm = document.querySelector('.js-sign-up-form');

  signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    makeNewUser(e);
  });

  function makeNewUser(event) {
    let form = event.currentTarget;


  }
}());