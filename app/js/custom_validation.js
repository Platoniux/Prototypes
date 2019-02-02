(function() {
  'use strict';

  function CustomValidation(input) {
    this.invalidities = [];
    this.arrOfRuls = [];
    this.inputNode = input;

    this.registerListener();
  }

  CustomValidation.prototype = {
    addInvalidity: function(message) {
      this.invalidities.push(message);
    },
    getInvalidities: function() {
      return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
      this.arrOfRuls.forEach(item => {
        if (item.isInvalid(input)) {
          input.classList.add('js-invalid-input');
          input.classList.remove('js-valid-input');
          item.element.classList.add('js-invalid');
          item.element.classList.remove('js-valid');
          this.addInvalidity(item.invalidityMessage);
        } else {
          input.classList.remove('js-invalid-input');
          input.classList.add('js-valid-input');
          item.element.classList.add('js-valid');
          item.element.classList.remove('js-invalid');
        }
      });
    },
    checkInput: function() {
      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
        this.inputNode.setCustomValidity('');
      } else {
        let message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
      }
    },
    registerListener: function() {
      let CustomValidation = this;

      this.inputNode.addEventListener('input', function() {
        CustomValidation.checkInput();
      });
    }
  };

  const customerNameValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-name-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length >= 0 && input.value.length < 3);
      },
      invalidityMessage: 'This field must contains at least 3 characters',
      element: document.querySelector('.js-custom-name-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must only contain letters (no digits or special characters)',
      element: document.querySelector('.js-custom-name-req li:nth-child(3)')
    }
  ];

  const passwordValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-pass-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /\d+/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain digits',
      element: document.querySelector('.js-pass-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /[A-Z]+/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain capitalize letter',
      element: document.querySelector('.js-pass-req li:nth-child(3)')
    },
    {
      isInvalid: function(input) {
        return (input.value.length >= 0 && input.value.length < 8);
      },
      invalidityMessage: 'Must contain more then 8 characters',
      element: document.querySelector('.js-pass-req li:nth-child(4)')
    }
  ];

  const confirmPasswordValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-confirm-pass-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let passField = document.querySelector('.js-pass');
        if (passField.value) {
          return input.value !== passField.value;
        }
        return true;
        // return input.value !== passField.value;
      },
      invalidityMessage: 'Must be match above password',
      element: document.querySelector('.js-confirm-pass-req li:nth-child(2)')
    }
  ]

  const emailValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-email-req li:first-child')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contains only one \'@\'',
      element: document.querySelector('.js-custom-email-req li:nth-child(2)')
    }
  ];

  const phoneValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-phone-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return input.value[0] !== '+';
      },
      invalidityMessage: 'The firs character must be \'+\'',
      element: document.querySelector('.js-custom-phone-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^\+[0-9]+$/;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'This field must contain only digints',
      element: document.querySelector('.js-custom-phone-req li:nth-child(3)')
    },
    {
      isInvalid: function(input) {
        return input.value.length < 9;
      },
      invalidityMessage: 'Minlenght is 9 characters',
      element: document.querySelector('.js-custom-phone-req li:nth-child(4)')
    }
  ];

  const addressValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-address-req li:first-child') 
    }
  ];

  const cityValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-city-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-city-req li:nth-child(2)')
    }
  ];

  const stateValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-state-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-state-req li:nth-child(2)')
    }
  ];

  const zipValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-zip-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        if (input.value) {
          let regexp = /.[^a-zA-Z0-9]+/;
          return regexp.test(input.value);
        }
        return true;
      },
      invalidityMessage: 'Must contain only letters and/or digits (no special characters)',
      element: document.querySelector('.js-custom-zip-req li:nth-child(2)')
    }
  ];

  const countryValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-custom-country-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-z ,.'-]+$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must contain only letters (no digits or special characters)',
      element: document.querySelector('.js-custom-country-req li:nth-child(2)')
    }
  ];

  const nameOfCurdValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-name-card-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length >= 0 && input.value.length < 3);
      },
      invalidityMessage: 'This field must contains at least 3 characters',
      element: document.querySelector('.js-name-card-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        let regexp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
        return !(regexp.test(input.value));
      },
      invalidityMessage: 'Must only contains letters (no digits or special characters)',
      element: document.querySelector('.js-name-card-req li:nth-child(3)')
    }
  ];

  const curdNumberValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-cc-number-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return input.value.length !== 16;
      },
      invalidityMessage: 'Must contains 16 digits',
      element: document.querySelector('.js-cc-number-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        if (input.value) {
          let regexp = /[^0-9]+/;
          return regexp.test(input.value);
        }
        return true;
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-cc-number-req li:nth-child(3)')
    }
  ];

  const cvcValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-cvc-req li:first-child') 
    },
    {
      isInvalid: function(input) {
        return (input.value.length !== 3 && input.value.length !== 4);
      },
      invalidityMessage: 'Must conatin 3 or 4 digits',
      element: document.querySelector('.js-cvc-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        if (input.value) {
          let regexp = /[^0-9]+/;
          return regexp.test(input.value);
        }
        return true;
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-cvc-req li:nth-child(3)')
    }
  ];

  const expiryValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required',
      element: document.querySelector('.js-card-expiry-req li:first-child')
    },
    {
      isInvalid: function(input) {
        if (input.value) {
          let regexp = /\d\d\-\d\d\d\d/;
          return (input.value.length !== 7 || !(regexp.test(input.value)));
        }
        return true;
      },
      invalidityMessage: 'Must contain only 7 characters (including \'-\')',
      element: document.querySelector('.js-card-expiry-req li:nth-child(2)')
    },
    {
      isInvalid: function(input) {
        if (input.value) {
          let regexp = /[^-0-9]+/;
          return regexp.test(input.value);
        }
        return true;
      },
      invalidityMessage: 'Must only contain digits (no letters or special characters)',
      element: document.querySelector('.js-card-expiry-req li:nth-child(3)')
    }
  ];

  const requiredField = [
    {
      isInvalid: function(input) {
        return input.value === '';
      },
      invalidityMessage: 'This field is required'
    }
  ];

  const forms = document.querySelectorAll('.js-form');

  installValidationForForm(forms);

  function installValidationForForm(arrOfForms) {
    [].forEach.call(arrOfForms, formItem => {
      let arrOfInputs = formItem.querySelectorAll('.js-inputs');
      let buttons = formItem.querySelectorAll('.js-buttons');
      [].forEach.call(arrOfInputs, item => {
        if (item.classList.contains('js-customer-name')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = customerNameValidityChecks;
        } else if (item.classList.contains('js-pass')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = passwordValidityChecks;
        } else if (item.classList.contains('js-confirm-pass')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = confirmPasswordValidityChecks;
        } else if (item.classList.contains('js-customer-email')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = emailValidityChecks;
        } else if (item.classList.contains('js-customer-tel')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = phoneValidityChecks;
        } else if (item.classList.contains('js-customer-city')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = cityValidityChecks;
        } else if (item.classList.contains('js-customer-address')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = addressValidityChecks;
        } else if (item.classList.contains('js-customer-state')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = stateValidityChecks;
        } else if (item.classList.contains('js-customer-zip')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = zipValidityChecks;
        } else if (item.classList.contains('js-customer-country')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = countryValidityChecks;
        } else if (item.classList.contains('js-cardholder-name')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = nameOfCurdValidityChecks;
        } else if (item.classList.contains('js-card-number')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = curdNumberValidityChecks;
        } else if (item.classList.contains('js-card-cvc')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = cvcValidityChecks;
        } else if (item.classList.contains('js-card-expiry')) {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = expiryValidityChecks;
        } else {
          item.CustomValidation = new CustomValidation(item);
          item.CustomValidation.arrOfRuls = requiredField;
        }
      });
      [].forEach.call(buttons, btnItem => {
        if (btnItem.classList.contains('js-cancel-btn')) {
          btnItem.addEventListener('click', function() {
            resetForm(formItem);
          });
        }
      });
      validate(arrOfInputs);
    });

    function resetForm(someForm) {
      someForm.reset();
    }

    function validate(inputs) {
      [].forEach.call(inputs, item => {
        if (item.CustomValidation) {
          item.CustomValidation.checkInput();
        }
      });
    }

    function getInfoAboutUser(infoObj) {
      console.dir(infoObj);
    }
  }
}());