const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');

// 登录
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed1' });
    }
    const isMatch = (req.body.password == user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed2' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '24h' });
    res.json({ token: token, id:user._id, username:user.username, email:user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 注册
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: req.body.avatar,
      bio: req.body.bio
    });
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_KEY, { expiresIn: '24h' });
    res.json({ token: token, id:user._id, username:user.username, email:user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;