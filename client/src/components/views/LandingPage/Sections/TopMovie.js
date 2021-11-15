import React, {useState, useEffect} from 'react';
import '../LandingPage.scss';
import {FaStar, FaHeart} from 'react-icons/fa';

function TopMovie({movies}) {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const tmpMovie = [];
    for (let i = 0; i < 10; i++) {
      tmpMovie.push(movies[i]);
    }
    setMovies(tmpMovie);
  }, []);

  return (
    <div className="topMovieContent">
      <h1 className="category">
        <div className="ColBar"></div>TOP 10
      </h1>
      <p className="subCategory">현재 1위 ~ 10위까지의 영화는?</p>

      <div className="topChart">
        {Movies.map((movie, index) => (
          <div className="topChart-item">
            <div className="top-movie-left">
              <div className="top-movie-rank">{index + 1}</div>
              <div className="top-movie-info">
                <div>{movie.title}</div>
                <div className="top-movie-rate">
                  <FaStar className="star-icon" />
                  {movie.vote_average}
                </div>
              </div>
            </div>
            <FaHeart className="add-myPick-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMovie;
