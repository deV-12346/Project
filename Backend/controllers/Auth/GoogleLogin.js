const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../Utils/GoogleClient');
const User = require('../../Models/user.model');

const GoogleLogin = async (req, res, next) => {
  try {
    const code = req.body.code;
    console.log('Received code:', code);
    console.log('ENV:', {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
    });
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);

    // Get user info
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    console.log('Google user data:', data);

    const { email, name, picture } = data;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image: picture });
    }

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, email },
       process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.status(200).json({
      success: true,
      message: 'Google login success',
      token,
    });
  } catch (err) {
    console.error('GoogleLogin error:', err.response?.data || err.message);
    res.status(400).json({ error: 'Google login failed', details: err.response?.data || err.message });
    next(err)
  }
};

module.exports = { GoogleLogin };