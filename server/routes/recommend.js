const express = require('express');
const router = express.Router();
const {Recommend} = require('../models/Recommend');

router.post('/onRecommend', (req, res) => {
  const recommend = new Recommend(req.body);

  recommend.save((err, recommend) => {
    if (err) return res.status(400).json({success: false, err});
    return res.status(200).json({success: true, recommend});
  });
});

router.post('/unRecommend', (req, res) => {
  Recommend.findOneAndDelete({
    userId: req.body.userId,
    reviewId: req.body.reviewId,
  }).exec((err, recommend) => {
    if (err) return res.status(400).json({deleteSuccess: false, err});
    return res.status(200).json({deleteSuccess: true, recommend});
  });
});

router.post('/getRecommend', (req, res) => {
  Recommend.find({reviewId: req.body.reviewId}).exec((err, recommend) => {
    if (err) return res.status(400).json({getRecommendSuccess: false, err});
    return res.status(200).json({getRecommendSuccess: true, recommend});
  });
});

module.exports = router;
