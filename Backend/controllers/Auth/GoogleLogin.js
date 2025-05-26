const axios = require('axios');
const { oauth2Client } = require('../../Utils/GoogleClient');
const User = require('../../Models/Google.user.model');
const {generatetoken} = require("../../Middleware/Checkauth")

const GoogleLogin = async (req, res, next) => {
  try {
    const {code} = req.query
    const googleres = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(googleres.tokens)

    console.log('Access Token:',googleres.tokens.access_token);

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleres.tokens.access_token}`
    );

    console.log('Google user data:', data);

    const { email, name, picture } = data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ 
        username : name,
        email, 
        image: picture 
      });
    }
    const payload = {
          id: user.id,
          username:user.username,
          mobileno:user.mobileno,
          email: user.email,
         }
    const token = generatetoken(payload)

    res.status(200).json({
      success: true,
      message: 'Google login success',
      token,
      user
    });
  } catch (err) {
    next(err)
  }
};

module.exports = { GoogleLogin };