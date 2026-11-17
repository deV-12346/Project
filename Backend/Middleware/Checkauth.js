const jwt = require("jsonwebtoken");
const AppError = require("../Utils/AppError");

const CheckAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  
  if (!authorization) {
    return next(new AppError("Token not found. Please login", 401));
  }
  
  const token = req.headers.authorization.split(" ")[1]
  
  if (!token) {
    return next(new AppError("No token, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    // Let the global error handler deal with JWT errors
    next(error);
  }
};

const generatetoken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: "1h" })
}

module.exports = { CheckAuth, generatetoken };