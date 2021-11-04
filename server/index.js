const express = require('express');
const app = express();
const path = require('path');

const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected :)'))
  .catch((err) => console.log(err));

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({extended: true}));

// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());

// Router
app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
