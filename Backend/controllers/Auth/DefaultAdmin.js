const User = require("../../Models/user.model");

// The first admin is created only when DEFAULT_ADMIN_PASSWORD is set in the
// environment. Never hardcode credentials in the repo.
const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return;

  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!password) {
    console.log(
      "No admin exists and DEFAULT_ADMIN_PASSWORD is not set - skipping default admin creation"
    );
    return;
  }

  const newAdmin = new User({
    username: "admin",
    email: process.env.DEFAULT_ADMIN_EMAIL || "admin123@example.com",
    mobileno: process.env.DEFAULT_ADMIN_MOBILE || "0000000000",
    password,
    role: "admin",
  });
  await newAdmin.save();
  console.log("Default admin created");
};
module.exports = createDefaultAdmin;
