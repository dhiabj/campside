const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
