import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL} from './../../Config';
import './LandingPage.scss';
import MovieTrailer from './Sections/MovieTrailer';

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [Trailer, setTrailer] = useState([]);

  useEffect(() => {
    const movieInfo = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    const movieTrailer = `${API_URL}movie/580489/videos?api_key=${API_KEY}`;
    fetchMoviesInfo(movieInfo);
    // fetchMoviesInfo(movieTrailer);
    Trailer.forEach((trailer) => fetchMoviesInfo(trailer));
  }, []);

  const fetchMoviesInfo = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...Movies, ...response.results]);
      });
  };

  const createTrailerEndpoint = (movies) => {
    const trailer = [];
    for (let i = 0; i < 5; i++) {
      trailer.push(`${API_URL}movie/${movies[i].id}/videos?api_key=${API_KEY}`);
    }
    setTrailer(trailer);
  };

  return (
    <div className="LandingContainer">
      <MovieTrailer />
    </div>
  );
}

export default LandingPage;
