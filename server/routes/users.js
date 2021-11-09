const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middleware/auth');

router.post('/checkuser', (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) return res.status(400).json({isUser: false, err});
    res.status(200).json({isUser: true, userData: user});
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({success: false, err});
    return res.status(200).json({
      success: true,
      doc: doc,
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '해당 유저는 존재하지 않습니다.',
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id});
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {_id: req.user._id},
    {token: '', tokenExp: ''},
    (err, user) => {
      if (err) return res.json({success: false, err});
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

module.exports = router;
