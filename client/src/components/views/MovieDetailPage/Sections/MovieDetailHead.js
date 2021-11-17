import React from 'react';
import {FaStar} from 'react-icons/fa';

function MovieDetailHead({movie}) {
  return (
    <div className="movieDetail-sub">
      <div className="movieDetail-title">
        <h1>{movie.title}</h1>
        <span>Original Title :</span> {movie.original_title}
      </div>
      <div className="movieDetail-rate">
        <div className="movieDetail-rate-title">평점</div>
        <div className="movieDetail-rate-score">
          <FaStar className="rate-icon" /> <span>{movie.vote_average}</span> /
          10
        </div>
      </div>
    </div>
  );
}

export default MovieDetailHead;
