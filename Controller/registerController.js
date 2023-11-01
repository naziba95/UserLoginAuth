const User = require('../Model/Guest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;
  
  try {

  if (!username || !pwd) {
    return res.status(400).json({ message: 'username and password are required' });
  }


  // its a simple app no need to check duplicates
  // try {
  //   // Check for duplicate usernames in the db
  //   const duplicate = await User.findOne({ username: username }).exec();
  //   if (duplicate) {
  //     return res.status(409).json({ message: 'username already exists' });
  //   }

    // Encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Generate token
    const token = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET);

    // Create and store the new user with token
    const result = await User.create({
      username: username,
      password: hashedPwd,
      token: token,
    });


    // Return the token in the response
    res.status(201).json({ success: `New user ${username} created`, user: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };