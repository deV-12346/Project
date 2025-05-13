const { model, Schema } = require("mongoose")
const googleuser = new Schema({
      username: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
      },
      image: {
            type: String,
            required: true,
      }
})
module.exports = model("GoogleUser", googleuser, "google_users_data");