import React, {useEffect, useState} from 'react';
import './MyPickPage.scss';

function MyPickPage() {
  return (
    <div className="myPickContent">
      <div className="myPick-main">
        <div className="myPick-container">
          <div className="myPick-notice">MyPick</div>
          {/* <div className="movieList">
            {location.state.movie &&
              location.state.movie.map((movie, index) => (
                <div className="movieList-item" key={index}>
                  <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
                  <div className="movieList-item-info">
                    <h3>{movie.title}</h3>
                    <div className="top-movie-rate">
                      <FaStar className="star-icon" />
                      {movie.vote_average}
                    </div>
                    <button>
                      <div className="movieList-item-myPick">
                        <FaPlus className="plus-icon" />
                        My Pick
                      </div>
                    </button>
                    <button
                      onClick={() => props.history.push(`/movie/${movie.id}`)}
                    >
                      자세히
                    </button>
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MyPickPage;
