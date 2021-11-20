import React, {useState, useEffect} from 'react';

function MovieDetailReview({movieId, movie}) {
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [RateValue, setRateValue] = useState('');
  const [Review, setReview] = useState('');

  const onRateChangeHandler = (e) => {
    console.log(e.currentTarget.value);
    setRateValue(e.currentTarget.value);
  };

  const onReviewChangeHandler = (e) => {
    console.log(e.currentTarget.value);
    setReview(e.currentTarget.value);
  };

  return (
    <div className="MovieDetail-review">
      <h1>감상평 작성하기</h1>
      <div class="movie-rating">
        {RateScore.map((score) => (
          <>
            <input
              type="radio"
              id={`${score}-stars`}
              value={score}
              checked={RateValue === score}
              onChange={onRateChangeHandler}
            />
            <label for={`${score}-stars`}>★</label>
          </>
        ))}
      </div>
      <form>
        <textarea
          vlaue={Review}
          onChange={onReviewChangeHandler}
          placeholder={`${movie.title} 영화는 어떠셨나요?`}
        ></textarea>
        <button className={Review ? 'regist-btn clamp' : 'regist-btn'}>
          등록하기
        </button>
      </form>
    </div>
  );
}

export default MovieDetailReview;
