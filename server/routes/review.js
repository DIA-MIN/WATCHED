const express = require('express');
const router = express.Router();
const {Review} = require('../models/Review');

router.post('/register', (req, res) => {
  const review = new Review(req.body);

  review.save((err, review) => {
    if (err) return res.status(400).json({success: false, err});
    return res.status(200).json({success: true, review: review});
  });
});

module.exports = router;
