import React, {useEffect, useState} from 'react';
import './MovieDetailPage.scss';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import MovieDetailHead from './Sections/MovieDetailHead';
import MovieDetailTrailer from './Sections/MovieDetailTrailer';
import MovieDetailInfo from './Sections/MovieDetailInfo';

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [Trailer, setTrailer] = useState([]);

  useEffect(() => {
    const movieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    const movieCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;
    const movieTrailer = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;

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

    fetch(movieTrailer)
      .then((response) => response.json())
      .then((response) => {
        console.log('movie Trailer', response);
        const videoKey = response.results.filter(
          (list) =>
            list.name.includes('Trailer') || list.name.includes('Teaser')
        )[0].key;
        setTrailer(videoKey);
      });
  }, []);

  return (
    <div className="movieDetailContent">
      <div className="movieDetail-main">
        <MovieDetailHead movie={Movie} />
        <MovieDetailTrailer movie={Movie} trailer={Trailer} />
      </div>
      <div className="movieDetail-body">
        <MovieDetailInfo movie={Movie} />
      </div>
    </div>
  );
}

export default MovieDetailPage;
