const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected :)'))
  .catch((err) => console.log(err));

app.use(cors());
// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({extended: true}));

// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());

// Router
app.use('/api/users', require('./routes/users'));
app.use('/api/review', require('./routes/review'));
app.use('/api/recommend', require('./routes/recommend'));
app.use('/api/favorite', require('./routes/favorite'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

app.use('/test', (req, res) => {
  res.send('hello');
});
