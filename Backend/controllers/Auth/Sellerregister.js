const Seller = require("../../Models/seller.model");
const { sellerregisterationValidation } = require("../../Services/Validatiion_schema_s");
const Sellerregister = async (req, res, next) => {
  try {
    const registerValues = await sellerregisterationValidation.validateAsync(req.body);
    console.log(registerValues);
    console.log("Seller data:", req.body);
    const { sellername,email,mobileno ,password } = registerValues;
    const sellerEmail = await Seller.findOne({
      email,
    });
    console.log(email);
    
    if (sellerEmail) {
      return res.status(200).json({
        success: false,
        message: "User Email already exits",
      });
    }
    const newSeller = new Seller({
      sellername,
      password,
      email,
      mobileno,
    });
    await newSeller.save();

    res.status(200).json({
      success: true,
      message: "Seller registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = Sellerregister;