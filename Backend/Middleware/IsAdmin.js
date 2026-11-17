const User = require("../Models/user.model");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/catchAsync");

// Must run after CheckAuth. Confirms against the database (not the token)
// that the caller is currently an admin.
const IsAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return next(new AppError("Please login", 401));
  }
  
  const user = await User.findById(userId).select("role");
  
  if (!user || user.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  
  next();
});

module.exports = { IsAdmin };
