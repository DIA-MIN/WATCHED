import {response} from 'express';
import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../Config';

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);

  useEffect(() => {
    const movieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    const movieCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;

    fetch(movieInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log('movie detail', response);
        setMovie(response);
      });

    fetch(movieCast)
      .then((response) => response.json())
      .then((response) => {
        console.log('movie cast', response);
        setCast(response);
      });
  }, []);

  return (
    <div>
      <h1>무비 디테일 페이지</h1>
    </div>
  );
}

export default MovieDetailPage;
