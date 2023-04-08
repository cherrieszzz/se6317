const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  comment_time: { type: Date, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;