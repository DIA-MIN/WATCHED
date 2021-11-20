import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';

function MovieDetailWriteReview(props) {
  const user = useSelector((state) => state.user);
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [RateValue, setRateValue] = useState('');
  const [Review, setReview] = useState('');

  const onRateChangeHandler = (e) => {
    setRateValue(e.currentTarget.value);
  };

  const onReviewChangeHandler = (e) => {
    setReview(e.currentTarget.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      movieId: props.movieId,
      content: Review,
      rate: RateValue,
    };

    if (!user.userData.isAuth) {
      message.warn('로그인 후 이용 가능합니다.');
    } else {
      axios.post('/api/review/register', variables).then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          setRateValue('');
          setReview('');
          message.success('감상평 등록이 완료되었습니다.');
        } else {
          alert('감상평 등록에 실패했습니다.');
        }
      });
    }
  };

  return (
    <div className="MovieDetail-review">
      <h1>감상평 작성하기</h1>
      <div className="movie-rating">
        {RateScore.map((score, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`${score}-stars`}
              value={score}
              checked={RateValue === score}
              onChange={onRateChangeHandler}
            />
            <label for={`${score}-stars`}>★</label>
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={onSubmitForm}>
        <textarea
          value={Review}
          onChange={onReviewChangeHandler}
          placeholder={`${props.movie.title} 영화는 어떠셨나요?`}
        ></textarea>
        <button
          className={Review ? 'regist-btn clamp' : 'regist-btn'}
          onClick={onSubmitForm}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}

export default withRouter(MovieDetailWriteReview);
