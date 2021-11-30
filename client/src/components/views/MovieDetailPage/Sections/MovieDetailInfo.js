import React from 'react';

function MovieDetailInfo({movie}) {
  return (
    <ul className="movieDetail-info">
      <li className="movieDetail-genre">
        {movie.genres &&
          movie.genres.map((genre, index) => (
            <div key={index}>{genre.name}</div>
          ))}
      </li>
      <li>
        <span>개봉</span> {movie.release_date}
      </li>
      <li>
        <span>러닝타임</span> {movie.release_date}
      </li>
      <li>
        <p className="movieDetail-overview">{movie.overview}</p>
      </li>
    </ul>
  );
}

export default MovieDetailInfo;
