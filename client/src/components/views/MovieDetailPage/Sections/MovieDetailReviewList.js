import React, {useState, useEffect} from 'react';
import {Avatar, message} from 'antd';
import axios from 'axios';
import MovieRating from '../../commons/MovieRating';
import Recommend from './Recommend';

function MovieDetailReviewList({
  reviewList,
  writer,
  isLogin,
  updateReview,
  deleteReview,
  loadReviewRegist,
  loadReviewRating,
  loadReviewMy,
  setReviewList,
}) {
  const [RateValue, setRateValue] = useState('');
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateReview, setUpdateReview] = useState('');

  const refreshRateValue = (getRate) => {
    setRateValue(getRate);
  };

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
      rate: RateValue,
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

  const onDeleteReview = (reviewId) => {
    const check = window.confirm('해당 감상평을 정말로 삭제하시겠습니까?');
    const variables = {
      _id: reviewId,
    };
    if (check) {
      axios.post('/api/review/deleteReview', variables).then((response) => {
        if (response.data.deleteSuccess) {
          deleteReview(response.data.review._id);
          message.success('감상평이 성공적으로 삭제되었습니다.');
        } else {
          alert('감상평 삭제에 실패하였습니다.');
        }
      });
    }
  };

  const sortRegist = () => {
    setReviewList('');
    loadReviewRegist();
  };
  const sortRating = () => {
    setReviewList('');
    loadReviewRating();
  };
  const sortMy = () => {
    if (isLogin) {
      setReviewList('');
      loadReviewMy();
    } else {
      message.warn('로그인이 필요합니다.');
    }
  };

  if (reviewList.length !== 0) {
    return (
      <div className="MovieDetail-reviewList">
        <ul className="review-sorting">
          <li onClick={sortRegist}>등록순</li>
          <li onClick={sortRating}>평점순</li>
          <li onClick={sortMy}>MY</li>
        </ul>
        <ul className="review-container">
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
                    <MovieRating
                      // refreshRateValue={refreshRateValue}
                      rateId={'review-stars'}
                      rateValue={String(review.rate)}
                    />
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
                          <button onClick={() => onDeleteReview(review._id)}>
                            삭제
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="review">
                  {writer === review.writer._id && IsUpdate ? (
                    <div>
                      <MovieRating
                        refreshRateValue={refreshRateValue}
                        rateId={'reviewUpdate-stars'}
                        rateValue={RateValue}
                      />
                      <textarea
                        value={UpdateReview}
                        onChange={onReviewChange}
                      ></textarea>
                      <button onClick={() => onUpdateReview(review._id, index)}>
                        수정하기
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>{review.content}</p>
                      <Recommend reviewId={review._id} />
                    </>
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
