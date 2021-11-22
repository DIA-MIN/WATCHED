const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
    movieId: {
      type: String,
    },
  },
  {timestamps: true}
);

const Recommend = mongoose.model('Recommend', recommendSchema);

module.exports = {Recommend};
