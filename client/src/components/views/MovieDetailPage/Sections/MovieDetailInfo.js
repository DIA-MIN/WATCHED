import React, {useState} from 'react';

function MovieDetailInfo({movie}) {
  const [IsClamp, setIsClamp] = useState(false);

  const onClickHandler = () => {
    setIsClamp(!IsClamp);
  };

  return (
    <ul className="movieDetail-info">
      <li className="movieDetail-genre">
        {movie.genres && movie.genres.map((genre) => <div>{genre.name}</div>)}
      </li>
      <li>
        <span>개봉</span> {movie.release_date}
      </li>
      <li>
        <span>러닝타임</span> {movie.release_date}
      </li>
      <li>
        <div className="movieDetail-overview">{movie.overview}</div>
      </li>
    </ul>
  );
}

export default MovieDetailInfo;
