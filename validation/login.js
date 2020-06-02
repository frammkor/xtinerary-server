const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.nameOrEmail = !isEmpty(data.nameOrEmail) ? data.nameOrEmail : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    if (Validator.isEmpty(data.nameOrEmail)) {
        errors.nameOrEmail = "Email or User Name is required";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {errors, isValid: isEmpty(errors)};
};