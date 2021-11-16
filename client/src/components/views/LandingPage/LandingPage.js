import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from './../../Config';
import './LandingPage.scss';
import MovieTrailer from './Sections/MovieTrailer';
import TopMovie from './Sections/TopMovie';
import MovieChart from './Sections/MovieChart';

function LandingPage() {
  const [Movies, setMovies] = useState([]); // default movie

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
      {Movies.length > 0 ? <MovieChart movies={Movies} /> : null}
    </div>
  );
}

export default LandingPage;
