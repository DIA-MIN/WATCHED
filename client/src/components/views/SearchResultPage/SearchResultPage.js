import React, {useEffect, useState} from 'react';
import './SearchResultPage.scss';
import {IMAGE_BASE_URL} from '../../Config';
import {FaStar, FaPlus} from 'react-icons/fa';
import {useLocation} from 'react-router';
import {withRouter} from 'react-router-dom';

function SearchResultPage(props) {
  const location = useLocation();
  const [Movies, setMovies] = useState([]);
  const [SearchMovieTitle, setSearchMovieTitle] = useState('');

  useEffect(() => {
    console.log('검색 결과 =>', location.state.movie);
    console.log('검색 제목 =>', location.state.search);
    // setMovies(location.state.results);
    // setSearchMovieTitle(location.state.search);
  }, []);

  if (location.state.movie.length > 0) {
    return (
      <div className="searchResultContent">
        <div className="searchResult-main">
          <div className="searchMovie-container">
            <div className="searchResult-notice">
              <span>"{location.state.search}"</span>(와)과 일치하는 결과는
              다음과 같습니다.
            </div>
            <div className="movieList">
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
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="searchResultContent">
        <div className="searchResult-main">
          <div className="searchMovie-container">
            <div className="searchResult-notice">
              <span>"{SearchMovieTitle}"</span>(와)과 일치하는 결과가 없습니다.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResultPage);
