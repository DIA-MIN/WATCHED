import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';
import MovieDetailReviewList from './MovieDetailReviewList';

function MovieDetailWriteReview(props) {
  const user = useSelector((state) => state.user);
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [RateValue, setRateValue] = useState('');
  const [Review, setReview] = useState('');
  const [ReviewList, setReviewList] = useState([]);

  useEffect(() => {
    const variables = {
      movieId: props.movieId,
      writer: user.userData._id,
    };
    axios.post('/api/review/getReviews', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.comments);
        setReviewList(response.data.comments);
      } else {
        alert('감상평 리스트를 불러오는데 실패했습니다.');
      }
    });
  }, []);

  const refreshReview = (newReviews) => {
    setReviewList(ReviewList.concat(newReviews));
  };

  const updateReview = (newReviews) => {
    setReviewList(
      ReviewList.map((review) =>
        review._id === newReviews._id ? newReviews : review
      )
    );
  };

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
      axios.post('/api/review/writeCheck', variables).then((response) => {
        if (response.data.success) {
          if (response.data.writer) {
            message.warn('감상평은 영화별 1개만 작성 가능합니다.');
            setRateValue('');
            setReview('');
          } else {
            axios.post('/api/review/register', variables).then((response) => {
              if (response.data.success) {
                console.log('review write ==>', response.data);
                message.success('감상평 등록이 완료되었습니다.');
                refreshReview(response.data.comments);
                setRateValue('');
                setReview('');
              } else {
                alert('감상평 등록에 실패했습니다.');
              }
            });
          }
        } else {
          alert('작성자를 불러오는데 실패하셨습니다.');
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
      <MovieDetailReviewList
        reviewList={ReviewList}
        writer={user.userData._id}
        updateReview={updateReview}
      />
    </div>
  );
}

export default withRouter(MovieDetailWriteReview);
