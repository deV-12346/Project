const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    mobileno: Joi.number().required(),
    email: Joi.string().required(),
});
const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

module.exports = { registrationValidation ,loginValidation };