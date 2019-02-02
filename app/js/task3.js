;(function() {
  'use strict';

  let users = [];
  let currentUser = {};
  const startWindow = [
      document.querySelector('.js-page-forms')
  ];
  const adminWindow = [
      document.querySelector('.js-own-cabinet'),
      document.querySelector('.js-admin-btns')
  ];
  const visitorWindow = [
      document.querySelector('.js-own-cabinet')
  ];

  function User(name, password, role) {
    this.name = name;
    this.password = password;

    this.makeNewId();
  }
  User.prototype.makeNewId = function() {
    this.id = (Math.ceil(Math.PI * (Math.random() * 100)) * 1230);
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

  document.addEventListener('DOMContentLoaded', loadPageForUser);

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
        currentUserForLocalStorage = JSON.stringify(currentUser);
        localStorage.setItem('currentUser', currentUserForLocalStorage);
        if (currentUser.role === 'admin') {
          startWindow.forEach(item => {
            item.classList.add('js-display-none');
          });
          adminWindow.forEach(item => {
            item.classList.remove('js-display-none');
          });
        } else {
          startWindow.forEach(item => {
            item.classList.add('js-display-none');
          });
          visitorWindow.forEach(item => {
            item.classList.remove('js-display-none');
          });
        }
      }
    });
  }

  function exitFromCabinet() {
    let role = currentUser.role;
    if (role === 'admin') {
      adminWindow.forEach(item => {
        item.classList.add('js-display-none');
      });
    } else {
      visitorWindow.forEach(item => {
        item.classList.add('js-display-none');
      });
    }
    startWindow.forEach(item => {
      item.classList.remove('js-display-none');
    });
    currentUser = {};
    localStorage.clear();
  }

  function loadPageForUser() {
    let existingUser = localStorage.getItem('currentUser');
    if (existingUser) {
      existingUser = JSON.parse(existingUser);
      users.push(existingUser);
      startWindow.forEach(item => {
        item.classList.add('js-display-none');
      });
      if (existingUser.role === 'admin') {
        adminWindow.forEach(item => {
          item.classList.remove('js-display-none');
        });
      } else {
        visitorWindow.forEach(item => {
          item.classList.remove('js-display-none');
        });
      }
    }
  }
}());