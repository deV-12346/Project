const jwt = require("jsonwebtoken");

const CheckAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(401).json({
      message: "Token not found please login" 
    })
  }
  const token = req.headers.authorization.split(" ")[1]
  if (!token) {
    return res.status(401).json({
     message: "No token, authorization denied"
     });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired please login",
      });
    }
    return res.status(401).json({ message: "Token is not valid" });
  }
};
const generatetoken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: "1h" })
}
module.exports = { CheckAuth, generatetoken };