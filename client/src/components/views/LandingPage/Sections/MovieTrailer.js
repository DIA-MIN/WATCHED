import React, {useEffect, useState} from 'react';
import {Row, Col, Carousel} from 'antd';
import {IMAGE_BASE_URL} from './../../../Config';

function MovieTrailer(props) {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const movies = props.movies;
    console.log(movies);
    const trailer = [];
    for (let i = 0; i < 5; i++) {
      trailer.push(movies[i]);
    }
    setMovies(trailer);
  }, []);

  return (
    <div className="trailerContent">
      <h1>인기 트레일러</h1>
      <Carousel autoplay>
        {Movies &&
          Movies.map((movie, index) => (
            <>
              {/* <div
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
              > */}
              <div className="trailer-card">
                <img src={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} />
              </div>
              {/* </div> */}
            </>
          ))}
      </Carousel>
    </div>
  );
}

export default MovieTrailer;
