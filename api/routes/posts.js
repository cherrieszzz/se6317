const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');

// 查询所有博客文章
router.get('/posts', async (req, res) => {
  try {
    // const posts = await Post.find().populate('author', 'username avatar').exec();
    const posts = await Post.find({}).exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 创建博客文章
router.post('/posts', authMiddleware, async (req, res) => {
  const authorId = new mongoose.Types.ObjectId(req.user._id); 
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      authorId: authorId,
      publish_time: new Date(),
      tags: req.body.tags
    });
    console.log(req.body.title, req.body.content, authorId, new Date(), req.body.tags);
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
   
    res.status(500).send('Internal Server Error');
  }
});


//删除博客
router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await Comment.deleteMany({ post: post._id }).exec();
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
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
    const post = await Post.findById(req.body.post_id).exec();
    if (!post) {
      return res.status(400).json({ message: 'Post not found' });
    }
    const userid = new mongoose.Types.ObjectId(req.user._id);
    const postid = new mongoose.Types.ObjectId(post._id);
    console.log(userid + postid);
    const comment = new Comment({
      content: req.body.content,
      author: userid,
      post_id: postid,
      comment_time: new Date()
    });
    const savedComment = await comment.save();
    console.log(savedComment)
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).exec();
    console.log(comment);
    if (!comment) {
      return res.status(400).json({ message: 'Comment not found' });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      console.log(req.user._id);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;