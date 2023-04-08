const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 登录
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed1' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed2' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token: token });
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
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      avatar: req.body.avatar,
      bio: req.body.bio
    });
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, 'secret', { expiresIn: '1h' });
    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;