import React, {useEffect, useState} from 'react';
import {Row, Col, Carousel} from 'antd';
import {IMAGE_BASE_URL, API_URL, API_KEY} from './../../../Config';
import {BsPlayCircle} from 'react-icons/bs';

function MovieTrailer(props) {
  const [Movies, setMovies] = useState([]);
  const [TrailerEndpoint, setTrailerEndpoint] = useState([]);
  const [TrailerKey, setTrailerKey] = useState([]);
  const youtubeKeys = [];
  useEffect(() => {
    const movies = props.movies;
    console.log(movies);
    const trailer = [];
    for (let i = 0; i < 5; i++) {
      trailer.push(movies[i]);
    }
    setMovies(trailer);
    createEndpoint(Movies);
    TrailerEndpoint.forEach((endpoint) => fetchTrailerInfo(endpoint));
    setTrailerKey(youtubeKeys);
  }, []);

  const createEndpoint = (movie) => {
    const endpoint = [];
    movie.forEach((movie) =>
      endpoint.push(`${API_URL}movie/${movie.id}/videos?api_key=${API_KEY}`)
    );
    setTrailerEndpoint(endpoint);
  };

  const fetchTrailerInfo = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        youtubeKeys.push(
          res.results.filter(
            (list) =>
              list.name === 'Official Trailer' ||
              list.name === 'Official Teaser'
          )[0].key
        );
      });
  };

  return (
    <div className="trailerContent">
      <h1 className="category">인기 트레일러</h1>
      <Carousel autoplay>
        {Movies &&
          Movies.map((movie, index) => (
            <>
              <div
                key={index}
                className="trailer-card"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0)
                  39%, rgba(0,0,0,0)
                  41%, rgba(0,0,0,0.65)
                  100%),url('${IMAGE_BASE_URL}w1280${movie.backdrop_path}')`,
                  height: '450px',
                  backgroundSize: '100%, cover',
                  backgroundPosition: 'center, center',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <div className="trailer-poster">
                  <img src={`${IMAGE_BASE_URL}w154${movie.poster_path}`} />
                  <div className="trailer-title">
                    <BsPlayCircle className="play-icon" />
                    <span>"{movie.title}"</span>
                  </div>
                </div>
              </div>
            </>
          ))}
      </Carousel>
    </div>
  );
}

export default MovieTrailer;
