const Seller = require("../../Models/seller.model"); 
const bcrypt = require("bcryptjs");
const { sellerloginValidation } = require("../../Services/Validatiion_schema_s"); // Import your validation schema

const Sellerlogin = async (req, res, next) => {
  try {

    const { email, password } = await sellerloginValidation.validateAsync(req.body);
     console.log(req.body)
     console.log("Successfully loggin !")
    const existingSeller = await Seller.findOne({ email })
    if (!existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email address. Please register.",
      });
    }

    const isMatch = await bcrypt.compare(password, existingSeller.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller Login successfully",
      user: {
        sellername: existingSeller.sellername,
        email: existingSeller.email,
      },
    });

  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

module.exports = { Sellerlogin };