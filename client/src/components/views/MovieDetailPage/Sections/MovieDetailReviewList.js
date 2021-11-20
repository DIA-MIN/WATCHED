import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import axios from 'axios';

function MovieDetailReviewList({movieId}) {
  const [Review, setReview] = useState([]);
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [RateValue, setRateValue] = useState('');

  useEffect(() => {
    const variables = {
      movieId: movieId,
    };

    axios.post('/api/review/getReviews', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.comments);
        setReview(response.data.comments);
      } else {
        alert('감상평 리스트를 불러오는데 실패했습니다.');
      }
    });
  }, []);

  return (
    <div className="MovieDetail-reviewList">
      <ul>
        {Review &&
          Review.map((review, index) => (
            <li key={index}>
              <div className="review-profile-container">
                <Avatar
                  className="review-profile-img"
                  shape="square"
                  size={48}
                  src={review.writer.image}
                  alt="profileimg"
                />
                <div className="review-profile-info">
                  <div className="review-rating">
                    {RateScore.map((score, index) => (
                      <React.Fragment key={index}>
                        <input
                          type="radio"
                          id={`${score}-review-stars`}
                          checked={String(review.rate) === score}
                        />
                        <label for={`${score}-review-stars`}>★</label>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="review-name">
                    <div>{review.writer.name}</div>
                    <div>
                      <span>{review.createdAt.substring(0, 10)}</span>
                      <span>{review.createdAt.substring(11, 16)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="review"></div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MovieDetailReviewList;
