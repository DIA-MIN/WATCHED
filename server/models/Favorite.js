const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    movieRate: {
      type: String,
    },
    moviePoster: {
      type: String,
    },
  },
  {timestamps: true}
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {Favorite};
