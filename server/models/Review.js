const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: String,
    },
    content: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  {timestamps: true}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};
