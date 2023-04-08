const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');

// 查询所有博客文章
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username avatar').exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 查询指定博客文章的评论
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId }).populate('author', 'username avatar').exec();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 新增评论
router.post('/comments', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId).exec();
    if (!post) {
      return res.status(400).json({ message: 'Post not found' });
    }
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      post: post._id,
      publish_time: new Date()
    });
    const savedComment = await comment.save();
    post.comments.push(savedComment._id);
    await post.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).exec();
    if (!comment) {
      return res.status(400).json({ message: 'Comment not found' });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// 创建博客文章
router.post('/posts', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
      publish_time: new Date(),
      tags: req.body.tags,
      image: req.file ? req.file.path : undefined
    });
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(400).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await Comment.deleteMany({ post: post._id }).exec();
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;