const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const cors = require('cors');

const db_url = process.env.DB_URL;

mongoose.connect(db_url)
  .then(() => {
    console.log('Successful to connected database');
  }).catch((error) => {
    console.log(error)
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', postRoutes);
app.use('/auth', authRoutes);
app.use('/admin',adminRoutes);

// Start the server
app.listen(8000, function () {
  console.log('Server started on port 8000');
  console.log(process.env.DB_URL);
});