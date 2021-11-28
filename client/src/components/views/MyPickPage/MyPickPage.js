import React, {useEffect, useState} from 'react';
import './MyPickPage.scss';
import axios from 'axios';
import {FaPlus, FaStar} from 'react-icons/fa';
import {IMAGE_BASE_URL} from './../../Config';
import MovieChartPick from '../LandingPage/Sections/MovieChartPick';
import {withRouter} from 'react-router-dom';

function MyPickPage(props) {
  const userId = localStorage.getItem('user_id');
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const variables = {
      userId: userId,
    };

    axios.post('api/favorite/getPick', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setMovie(response.data.favorite);
      } else {
        alert('My Pick 리스트를 불러오는데 실패했습니다.');
      }
    });
  }, []);

  const refreshUnPick = (delMovieId) => {
    setMovie(Movie.filter((movie) => movie.movieId !== delMovieId));
  };

  if (Movie.length !== 0) {
    return (
      <div className="myPickContent">
        <div className="myPick-main">
          <div className="myPick-container">
            <h1 className="category">
              <div className="ColBar"></div>My Pick
            </h1>
            <p className="subCategory">나만의 영화 리스트를 만들어 보세요.</p>
            <div className="movieList">
              {Movie &&
                Movie.map((movie, index) => (
                  <div className="movieList-item" key={index}>
                    <img src={`${IMAGE_BASE_URL}w500${movie.moviePoster}`} />
                    <div className="movieList-item-info">
                      <h3>{movie.movieTitle}</h3>
                      <div className="top-movie-rate">
                        <FaStar className="star-icon" />
                        {movie.movieRate}
                      </div>
                      <MovieChartPick
                        movieId={movie.movieId}
                        movieTitle={movie.movieTitle}
                        movieRate={movie.movieRate}
                        moviePoster={movie.moviePoster}
                        mypick
                        refreshUnPick={refreshUnPick}
                      />
                      <button
                        onClick={() => {
                          props.history.push(`/movie/${movie.movieId}`);
                        }}
                      >
                        자세히
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="myPickContent">
        <div className="myPick-main">
          <div className="myPick-container">
            <h1 className="category">
              <div className="ColBar"></div>My Pick
            </h1>
            <p className="subCategory">나만의 영화 리스트를 만들어 보세요.</p>
            <div className="myPick-notice">
              <div>
                <span>My Pick</span>에 등록된 영화가 없습니다.
              </div>
              <button
                onClick={() => {
                  props.history.push('/');
                }}
              >
                등록하러 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MyPickPage);
