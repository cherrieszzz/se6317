const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const adminMiddleware = require('../middlewares/admin');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

router.post('/login', async (req, res) => {
    try {
      const admin = await Admin.findOne({ username: req.body.username }).exec();
      if (!admin) {
        return res.status(401).json({ message: 'Authentication failed1' });
      }
      const isMatch = (req.body.password == admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Authentication failed2' });
      }
      const token = jwt.sign({ adminId: admin._id, auth: 'admin' }, process.env.JWT_KEY, { expiresIn: '24h' });
      res.json({ token: token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
})

router.delete('/posts/:id',adminMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).exec();
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        await Comment.deleteMany({ post: post._id }).exec();
        await post.deleteOne();
        res.json({ message: 'Post deleted' });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
})

router.get('/comments', adminMiddleware, async (req, res) => {
  try {
    const comments = await Comment.find({}).exec();
    res.json(comments);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
})

router.delete('/comments/:id', adminMiddleware, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).exec();
      console.log(comment);
      if (!comment) {
        return res.status(400).json({ message: 'Comment not found' });
      }
      await comment.deleteOne();
      res.json({ message: 'Comment deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;