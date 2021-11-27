const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/pickMovie', (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, favorite) => {
    if (err) return res.status(400).json({pickSuccess: false, err});
    return res.status(200).json({pickSuccess: true, favorite});
  });
});

router.post('/unPickMovie', (req, res) => {
  Favorite.findOneAndDelete({
    userId: req.body.userId,
    movieId: req.body.movieId,
  }).exec((err, favorite) => {
    if (err) return res.status(400).json({pickDeleteSuccess: false, err});
    return res.status(200).json({pickDeleteSuccess: true, favorite});
  });
});

router.post('/checkPick', (req, res) => {
  Favorite.findOne({userId: req.body.userId, movieId: req.body.movieId}).exec(
    (err, favorite) => {
      if (err) return res.status(400).json({success: false, err});

      if (favorite !== null) {
        return res
          .status(200)
          .json({success: true, favorite: favorite, isFavorite: true});
      } else {
        return res
          .status(200)
          .json({success: true, favorite: favorite, isFavorite: false});
      }
    }
  );
});

router.post('/getPick', (req, res) => {
  Favorite.find({userId: req.body.userId}).exec((err, favorite) => {
    if (err) return res.status(400).json({success: false, err});
    return res.status(200).json({success: true, favorite: favorite});
  });
});

module.exports = router;
