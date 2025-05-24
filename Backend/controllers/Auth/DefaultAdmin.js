const User = require("../../Models/user.model");
const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const newAdmin = new User({
      username: "admin",
      email: "admin123@example.com",
      mobileno: "7018674227",
      password: "Anku1234",
      role: "admin",
    });
    await newAdmin.save();
    console.log("Default admin created");
  }
};
module.exports = createDefaultAdmin;