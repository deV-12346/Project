const User = require("../../Models/user.model")
const Removeuser = async (req, res, next) => {
      const { id } = req.body
      try {
            const deleteUser = await User.findByIdAndDelete(id);
            if (!deleteUser) {
                  return res.status(404).json({
                        success: false,
                        message: "User not found",
                  });
            }
            return res.status(200).json({
                  sucess: true,
                  message: "User Removed Successfully",
            })
      }
      catch (error) {
            next(error)
      }
}
module.exports = { Removeuser }