const Joi = require("joi");

const sellerregisterationValidation = Joi.object({
    sellername: Joi.string().required(),
    password: Joi.string().min(6).required(),
    mobileno: Joi.number().required(),
    email: Joi.string().required(),
});
const sellerloginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

module.exports = { sellerregisterationValidation ,sellerloginValidation };