import React, {useEffect, useState} from 'react';
import {FaHeart} from 'react-icons/fa';
import {IMAGE_BASE_URL} from '../../../Config';
import TopMoviePick from '../../LandingPage/Sections/TopMoviePick';

function MovieDetailTrailer({movie, trailer, movieId}) {
  return (
    <div className="movieDetail-view">
      <div>
        <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        {/* <FaHeart className="add-myPick-icon-DetailTrailer" /> */}
        <TopMoviePick
          movieId={movieId}
          movieRate={movie.vote_average}
          moviePoster={movie.poster_path}
        />
      </div>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1 `}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        className="movieDetail-trailer"
      ></iframe>
    </div>
  );
}

export default MovieDetailTrailer;
