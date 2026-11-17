const User = require("../Models/user.model");

// Must run after CheckAuth. Confirms against the database (not the token)
// that the caller is currently an admin.
const IsAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }
    const user = await User.findById(userId).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { IsAdmin };
