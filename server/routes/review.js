const express = require('express');
const router = express.Router();
const {Review} = require('../models/Review');

router.post('/register', (req, res) => {
  const review = new Review(req.body);

  review.save((err, review) => {
    if (err) return res.status(400).json({success: false, err});

    Review.find({_id: review._id})
      .populate('writer')
      .exec((err, comments) => {
        if (err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, comments});
      });
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

router.post('/writeCheck', (req, res) => {
  Review.findOne({movieId: req.body.movieId, writer: req.body.writer}).exec(
    (err, writer) => {
      if (err) return res.status(400).json({success: false, err});
      return res.status(200).json({success: true, writer});
    }
  );
});

module.exports = router;
