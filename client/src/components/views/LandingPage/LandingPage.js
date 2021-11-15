import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from './../../Config';
import './LandingPage.scss';
import MovieTrailer from './Sections/MovieTrailer';
import TopMovie from './Sections/TopMovie';

function LandingPage() {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    fetchMoviesInfo(endpoint);
  }, []);

  const fetchMoviesInfo = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...response.results]);
      });
  };

  return (
    <div className="LandingContainer">
      {Movies.length > 0 ? <MovieTrailer movies={Movies} /> : null}
      {Movies.length > 0 ? <TopMovie movies={Movies} /> : null}
      <div className="movieContent">
        <h1 className="category">
          <div className="ColBar"></div>무비 차트
        </h1>
        <p className="subCategory">지금 더 많은 영화들을 만나보세요.</p>
        <ul className="movieCategory">
          <li>인기순</li>
          <li>최신순</li>
          <li>평점순</li>
        </ul>
        <div className="movieList">
          {Movies &&
            Movies.map((movie, index) => (
              <div className="movieList-item">
                <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
