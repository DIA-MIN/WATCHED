import React, {useEffect, useState} from 'react';
import {Row, Col, Carousel} from 'antd';
import {IMAGE_BASE_URL, API_URL, API_KEY} from './../../../Config';
import TrailerPoster from './TrailerPoster';
import Modal from './Modal';

function MovieTrailer(props) {
  const [Movies, setMovies] = useState([]);
  const [TrailerKey, setTrailerKey] = useState([]);
  const [TrailerKeyIndex, setTrailerKeyIndex] = useState(0);
  const [ModalOpen, setModalOpen] = useState(false);
  const youtubeKeys = [];

  useEffect(() => {
    const movies = props.movies;
    // console.log(movies);
    const trailer = [];
    let endpoint = [];
    for (let i = 0; i < 5; i++) {
      trailer.push(movies[i]);
    }
    setMovies(trailer);
    endpoint = createEndpoint(trailer);
    endpoint.forEach((endpoint) => fetchTrailerInfo(endpoint));
    setTrailerKey(youtubeKeys);
  }, []);

  const createEndpoint = (movie) => {
    const endpoint = [];
    movie.forEach((movie) =>
      endpoint.push(`${API_URL}movie/${movie.id}/videos?api_key=${API_KEY}`)
    );
    return endpoint;
  };

  const fetchTrailerInfo = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        youtubeKeys.push(
          res.results.filter(
            (list) =>
              // list.name === 'Official Trailer' ||
              // list.name === 'Official Teaser'
              list.name.includes('Trailer') || list.name.includes('Teaser')
          )[0].key
        );
      });
  };

  const onModalClose = (index) => {
    setModalOpen(!ModalOpen);
    setTrailerKeyIndex(index);
  };

  return (
    <div className="trailerContent">
      <h1 className="category">
        <div className="ColBar"></div>인기 트레일러
      </h1>
      <p className="subCategory">인기 있는 영화의 예고편을 감상해보세요.</p>
      <Carousel autoplay>
        {Movies &&
          Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <div
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
                onClick={() => {
                  onModalClose(index);
                }}
              >
                <TrailerPoster
                  poster={movie.poster_path}
                  posterTitle={movie.title}
                />
              </div>
            </React.Fragment>
          ))}
      </Carousel>
      {ModalOpen && (
        <Modal
          modalCLose={onModalClose}
          movie={Movies[TrailerKeyIndex]}
          trailerKey={TrailerKey[TrailerKeyIndex]}
        />
      )}
    </div>
  );
}

export default MovieTrailer;
