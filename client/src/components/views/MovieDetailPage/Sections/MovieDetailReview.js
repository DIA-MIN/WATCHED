import React, {useState, useEffect} from 'react';

function MovieDetailReview() {
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);
  const [RateValue, setRateValue] = useState('');

  const onRateChangeHandler = (e) => {
    console.log(e.currentTarget.value);
    setRateValue(e.currentTarget.value);
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
    </div>
  );
}

export default MovieDetailReview;
