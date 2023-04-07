const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db_url = process.env.DB_URL;

mongoose.connect(db_url)
  .then(() => {
    console.log('Successful to connected database');
  }).catch((error) => {
    console.log(error)
  })

// Signup route
app.post('/api/signup', function (req, res) {
  // Handle POST request here
});

// Update password route
app.post('/api/updatepasswd', function (req, res) {
  // Handle POST request here
});

// Get all blogs route
app.get('/api/blogs', function (req, res) {
  // Handle GET request here
});

// Get single blog route
app.get('/api/blogs/:blogid', function (req, res) {
  // Handle GET request here
});

// Delete blog route
app.delete('/api/blogs/:blogid', function (req, res) {
  // Handle DELETE request here
});

// Get user route
app.get('/api/:userid', function (req, res) {
  // Handle GET request here
});

// Get user's blogs route
app.get('/api/:userid/blogs', function (req, res) {
  // Handle GET request here
});

// Add blog route
app.post('/api/addblog', function (req, res) {
  // Handle POST request here
});

// Add comment to blog route
app.post('/api/blogs/:blogid/comments', function (req, res) {
  // Handle POST request here
});

// Remove comment from blog route
app.delete('/api/blogs/:blogid/comments', function (req, res) {
  // Handle DELETE request here
});

// Start the server
app.listen(8000, function () {
  console.log('Server started on port 3000');
  console.log(process.env.DB_URL);
});