import React, {useEffect, useState} from 'react';

function MovieRating({refreshRateValue, rateId, rateValue}) {
  const [RateScore, setRateScore] = useState(['5', '4', '3', '2', '1']);

  const onRateChangeHandler = (e) => {
    refreshRateValue(e.currentTarget.value);
  };

  return (
    <div className="movie-rating">
      {RateScore.map((score, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            id={`${score}-${rateId}`}
            value={score}
            checked={rateValue === score}
            onChange={onRateChangeHandler}
          />
          <label for={`${score}-${rateId}`}>★</label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MovieRating;
