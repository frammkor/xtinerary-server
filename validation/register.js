/*
1- require validator and is-empty dependencies
2- Export the function validateRegisterInput, which takes in data as a parameter (sent from our frontend registration form)
3- Instantiate our errors object
4- Convert all empty fields to an empty string before running validation checks (validator only works with strings)
5- Check for empty field, valid email formats, password requirements and confirm password equality using validator functions
6- Return our errors object with any and all errors contained as well as an isValid boolean that checks to see if we have any errors
*/

const   Validator = require('validator'),
        isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // convert empty fields to an empty string so we can use validator functions
    data.userName = !isEmpty(data.userName) ? data.userName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Name checks
    if (Validator.isEmpty(data.userName)) {
        errors.userName = 'User Name field is required';
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors. email = 'Email is invalid';
    }

    // password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have at least 6 characters and no more than 30 ';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};