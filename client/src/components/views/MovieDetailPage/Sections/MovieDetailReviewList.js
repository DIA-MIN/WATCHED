import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Avatar, message} from 'antd';
import axios from 'axios';

function MovieDetailReviewList({reviewList, writer, updateReview}) {
  const [Review, setReview] = useState([]);
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateReview, setUpdateReview] = useState('');

  const onChangeHandler = () => {};

  const onUpdateReviewClamp = (content) => {
    setIsUpdate(!IsUpdate);
    setUpdateReview(content);
  };

  const onReviewChange = (e) => {
    setUpdateReview(e.currentTarget.value);
  };

  const onUpdateReview = (reviewId) => {
    const check = window.confirm('해당 감상평을 수정하시겠습니까?');
    const variables = {
      _id: reviewId,
      content: UpdateReview,
    };
    if (check) {
      axios.post('/api/review/updateReview', variables).then((response) => {
        if (response.data.updateSuccess) {
          setIsUpdate(false);
          updateReview(response.data.comments[0]);
          message.success('감상평 수정이 완료되었습니다.');
        } else {
          alert('감상평을 수정하는데 실패하셨습니다.');
        }
      });
    }
  };

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
                            onChange={onChangeHandler}
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
                          <button
                            onClick={() => onUpdateReviewClamp(review.content)}
                          >
                            수정
                          </button>
                          <button>삭제</button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="review">
                  {writer === review.writer._id && IsUpdate ? (
                    <div>
                      <textarea
                        value={UpdateReview}
                        onChange={onReviewChange}
                      ></textarea>
                      <button onClick={() => onUpdateReview(review._id, index)}>
                        수정하기
                      </button>
                    </div>
                  ) : (
                    <p>{review.content}</p>
                  )}
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
