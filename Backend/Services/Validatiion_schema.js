const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    mobileno: Joi.string().required(),
    email: Joi.string().required(),
});
const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
const AdduserregistrationValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    mobileno: Joi.string().required(),
    email: Joi.string().required(),
    role:Joi.string().valid("user","admin").required()
});
  const passwordvalidation = Joi.object({
      email: Joi.string().email().required(),
      new_password: Joi.string().min(6).required(),
      confirm_password: Joi.string().valid(Joi.ref('new_password')).required(),
      otp: Joi.string().length(6).required()
})
const sellerregisterationValidation = Joi.object({
    sellername: Joi.string().required(),
    password: Joi.string().min(6).required(),
    mobileno: Joi.string().required(),
    email: Joi.string().required(),
});
const sellerloginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

const ProductValidation = Joi.object({
    productName : Joi.string().max(20).required(),
    productDescription : Joi.string().min(20).required(),
    category : Joi.string().required(),
    productPrice : Joi.number().required(),
    offerPrice : Joi.number().required()
});
const UsedProductValidation = Joi.object({
    id:Joi.string().required(),
    productName:Joi.string().required(),
    productDescription : Joi.string().min(30).required(),
    price:Joi.number().required(),
    category:Joi.string().required(),
    address:Joi.string().required(),

})
module.exports = { registrationValidation ,loginValidation,
    AdduserregistrationValidation, passwordvalidation,
    sellerloginValidation, sellerregisterationValidation ,ProductValidation,
    UsedProductValidation
};