const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publish_time: { type: Date, required: true },
  tags: [{ type: String }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;