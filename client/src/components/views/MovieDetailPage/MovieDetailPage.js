import React, {useEffect, useState} from 'react';
import './MovieDetailPage.scss';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import {FaStar, FaPlus, FaHeart} from 'react-icons/fa';
import MovieTrailer from './../LandingPage/Sections/MovieTrailer';

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
        <h1>{Movie.title}</h1>
        <div className="movieDetail-sub">
          <div>
            <span>Original Title :</span> {Movie.original_title}
          </div>
          <div className="movieDetail-rate">
            <div className="movieDetail-rate-title">평점</div>
            <div className="movieDetail-rate-score">
              <FaStar className="rate-icon" /> <span>{Movie.vote_average}</span>{' '}
              / 10
            </div>
          </div>
        </div>
        <div className="movieDetail-view">
          <div>
            <img src={`${IMAGE_BASE_URL}w500${Movie.poster_path}`} />
            <FaHeart className="add-myPick-icon" />
          </div>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${Trailer}?autoplay=1&mute=1 `}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            className="movieDetail-trailer"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
