const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;

  return (
    date.getFullYear() + '-' + month + '-' + day + '  ' + hour + ':' + minute
  );
}

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
    date: {
      type: String,
      default: dateFormat(date),
    },
  },
  {timestamps: true}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};
