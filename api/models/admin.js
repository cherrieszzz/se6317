const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , unique:true},
  avatar: { type: String }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;