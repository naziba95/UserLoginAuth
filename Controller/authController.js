const User = require('../Model/Guest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd) return res.status(400).json({ 'message': 'username and password are required' });

  try {
    const foundUser = await User.findOne({ username: username }).exec();
    
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            username: foundUser.username,
          }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '5m' }
      );

      foundUser.token = refreshToken;
      await foundUser.save();
      
      // Set refreshToken as an HTTP-only cookie
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000, secure: true });

      res.json({ message: 'Login Successful', user: foundUser }); // Return user details without access token
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { handleLogin };
