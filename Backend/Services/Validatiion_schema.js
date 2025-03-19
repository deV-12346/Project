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
  const passwordvalidation = Joi.object({
      old_password: Joi.string().min(6).required(),
      new_password: Joi.string().min(6).required(),
      confirm_password: Joi.string().valid(Joi.ref('new_password')).required(),
  })

module.exports = { registrationValidation ,loginValidation,passwordvalidation};