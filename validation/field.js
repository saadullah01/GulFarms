const Validator = require("validator");
const isEmpty = require("is-empty");

const validateEmailInput = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const validatePasswordInput = (data) => {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.password = !isEmpty(data.password) ? data.password : "";
    data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.rePassword)) {
        errors.rePassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }
    if (!Validator.equals(data.password, data.rePassword)) {
        errors.rePassword = "Passwords must match";
    }
}

module.exports = {
    email: validateEmailInput,
    password: validatePasswordInput
}