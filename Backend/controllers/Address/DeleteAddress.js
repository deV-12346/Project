const Address = require("../../Models/Address")
const DeleteAddress = async (req, res, next) => {
      try {
            const { id } = req.body
            console.log(id)
            const address = await Address.findByIdAndDelete(id)
            if (!address) {
            return res.status(400).json({
                  success: false,
                  message: "Address not found"
            })
            }
            return res.status(200).json({
                  success: true,
                  message: "Address deleted successfully",
                  address
            })
      }
      catch (err) {
            next(err)
      }
}
module.exports = { DeleteAddress }