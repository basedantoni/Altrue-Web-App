const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  //Password Checks
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  // Length of password check
  if(!Validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};