/////////////////////////// Validation //////////////

// Requiring third party packages
const Joi = require('@hapi/joi');

// Validation for Registration
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
    });
    return schema.validate(data);
};

// Validation for Login
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
    });
    return schema.validate(data);
};

// Exporting both Validations
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;