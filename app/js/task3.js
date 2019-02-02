;(function() {
  'use strict';

  let users = [];
  let currentUser = {};
  const startWindow = document.querySelectorAll('.js-page-forms');
  const adminWindow = document.querySelectorAll('.js-admin-window');
  const visitorWindow = document.querySelectorAll('.js-visitor-window');

  function User(name, password) {
    this.name = name;
    this.password = password;

    this.makeNewId();
  }
  User.prototype.makeNewId = function() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);;
  };
  User.prototype.viewNews = function() {
    console.log('news');
  };
  User.prototype.editPassword = function() {
    console.log('Password was changed');
  };
  User.prototype.editName = function() {
    console.log('Name was changed');
  };
  
  function Admin(name, password) {
    User.apply(this, arguments);
    this.role = 'admin';
  }

  function Visitor(name, password, role = 'user') {
    User.apply(this, arguments);
    this.role = 'user';
  }

  Admin.prototype = Object.create(User.prototype);
  Visitor.prototype = Object.create(User.prototype);

  Admin.prototype.editNews = function() {
    console.log('I edited news');
  };
  Admin.prototype.deleteNews = function() {
    console.log('News were deleted');
  };



  const signUpForm = document.querySelector('.js-sign-up-form');
  const signInForm = document.querySelector('.js-sign-in-form');
  const logOut = document.querySelector('.js-logout');
  const userName = document.querySelector('.js-user-name');

  document.addEventListener('DOMContentLoaded', function() {
    loadPageForUser();
    showUserName(currentUser);
  });

  signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    makeNewUser(e, Admin, Visitor);
  });

  signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    logInForUser(e, users);
  });

  logOut.addEventListener('click', exitFromCabinet);


  function makeNewUser(event, firstObj, secondObj) {
    let newUser = {};
    let form = event.currentTarget;
    let eventForLogin = event;
    let userName = form.querySelector('.js-customer-name').value;
    let userPass = form.querySelector('.js-pass').value;
    let adminCheck = form.querySelector('.js-admin');
    if (adminCheck.checked) {
      newUser = new firstObj(userName, userPass);
    } else {
      newUser = new secondObj(userName, userPass)
    }
    users.push(newUser);
    logInForUser(eventForLogin, users);
  }

  function logInForUser(event, arrOfUsers) {
    let logInForm = event.currentTarget;
    let currentUserForLocalStorage = {};
    let name = logInForm.elements.login.value;
    let pass = logInForm.elements.password.value;
    arrOfUsers.forEach(item => {
      if (item.name === name && item.password === pass) {
        currentUser = item;
        showUserName(currentUser);
        currentUserForLocalStorage = JSON.stringify(currentUser);
        localStorage.setItem('currentUser', currentUserForLocalStorage);
        if (currentUser.role === 'admin') {
          startWindow.forEach(item => {
            item.classList.add('js-display-none');
          });
          [].forEach.call(adminWindow, item => {
            item.classList.remove('js-display-none');
          });
        } else {
          [].forEach.call(startWindow, item => {
            item.classList.add('js-display-none');
          });
          [].forEach.call(visitorWindow, item => {
            item.classList.remove('js-display-none');
          });
        }
      }
    });
  }

  function exitFromCabinet() {
    let role = currentUser.role;
    if (role === 'admin') {
      [].forEach.call(adminWindow, item => {
        item.classList.add('js-display-none');
      });
    } else {
      [].forEach.call(visitorWindow, item=> {
        item.classList.add('js-display-none');
      });
    }
    [].forEach.call(startWindow, item => {
      item.classList.remove('js-display-none');
    });
    currentUser = {};
    localStorage.clear();
  }

  function loadPageForUser() {
    let existingUser = localStorage.getItem('currentUser');
    if (existingUser) {
      existingUser = currentUser = JSON.parse(existingUser);
      console.log(currentUser);
      console.log(existingUser);
      users.push(existingUser);
      [].forEach.call(startWindow, item => {
        item.classList.add('js-display-none');
      });
      if (existingUser.role === 'admin') {
        [].forEach.call(adminWindow, item => {
          item.classList.remove('js-display-none');
        });
      } else {
        [].forEach.call(visitorWindow, item => {
          item.classList.remove('js-display-none');
        });
      }
    }
  }

  function showUserName(obj) {
    let name = obj.name.toUpperCase();
    userName.innerHTML = name;
  }
}());