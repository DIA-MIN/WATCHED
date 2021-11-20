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

router.post('/getReviews', (req, res) => {
  Review.find({movieId: req.body.movieId})
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).json({success: false, err});
      return res.status(200).json({success: true, comments});
    });
});

module.exports = router;
