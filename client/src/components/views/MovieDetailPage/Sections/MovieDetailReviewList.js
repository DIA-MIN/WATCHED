import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import axios from 'axios';

function MovieDetailReviewList({reviewList, writer}) {
  const [Review, setReview] = useState([]);
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);

  if (reviewList.length !== 0) {
    return (
      <div className="MovieDetail-reviewList">
        <ul>
          {reviewList &&
            reviewList.map((review, index) => (
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
                        <span>{review.date}</span>
                      </div>
                      {writer === review.writer._id ? (
                        <div>
                          <button>수정</button>
                          <button>삭제</button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="review">
                  <p>{review.content}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default MovieDetailReviewList;
