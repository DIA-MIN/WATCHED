import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL} from './../../Config';
import './LandingPage.scss';
import MovieTrailer from './Sections/MovieTrailer';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  // const [Trailer, setTrailer] = useState([]); // Trailer endpoint

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    // const movieTrailer = `${API_URL}movie/580489/videos?api_key=${API_KEY}`;
    fetchMoviesInfo(endpoint);
  }, []);

  const fetchMoviesInfo = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...response.results]);
        console.log('Movie list', Movies);
      });
  };

  return (
    <div className="LandingContainer">
      {Movies.length > 0 ? <MovieTrailer movies={Movies} /> : null}
    </div>
  );
}

export default LandingPage;
