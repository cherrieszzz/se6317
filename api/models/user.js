const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , unique :true},
  avatar: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;