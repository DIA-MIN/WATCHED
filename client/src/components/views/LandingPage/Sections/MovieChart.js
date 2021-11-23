import React, {useEffect, useState} from 'react';
import {FaStar, FaPlus} from 'react-icons/fa';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../../Config';
import Pagenation from 'react-js-pagination';
import {withRouter} from 'react-router-dom';
import MoviePick from './MoviePick';

function MovieChart(props, {movies}) {
  const [CategoryMovies, setCategoryMovies] = useState([]);
  const [Page, setPage] = useState(1);
  const [Category, setCategory] = useState('');

  useEffect(() => {
    setCategoryMovies(movies);
  }, []);

  useEffect(() => {
    switch (Category) {
      case 'popular':
        loadPopularMovie();
        break;
      case 'rated':
        loadTopRatedMovie();
        break;
      case 'upcoming':
        loadUpcomingMovie();
        break;
      default:
        loadPopularMovie();
    }
  }, [Page]);

  const handlePageChange = (Page) => {
    setPage(Page);
  };

  const fetchCategoryMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setCategoryMovies([...response.results]);
      });
  };

  const loadPopularMovie = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${Page}`;
    setCategory('popular');
    fetchCategoryMovies(endpoint);
  };
  const loadTopRatedMovie = () => {
    const endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=ko&page=${Page}`;
    setCategory('rated');
    fetchCategoryMovies(endpoint);
  };
  const loadUpcomingMovie = () => {
    const endpoint = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=ko&page=${Page}`;
    setCategory('upcoming');
    fetchCategoryMovies(endpoint);
  };

  return (
    <div className="movieContent">
      <h1 className="category">
        <div className="ColBar"></div>무비 차트
      </h1>
      <p className="subCategory">지금 더 많은 영화들을 만나보세요.</p>
      <ul className="movieCategory">
        <li onClick={loadPopularMovie}>인기순</li>
        <li onClick={loadTopRatedMovie}>평점순</li>
        <li onClick={loadUpcomingMovie}>개봉 예정</li>
      </ul>
      <div className="movieList">
        {CategoryMovies &&
          CategoryMovies.map((movie, index) => (
            <div className="movieList-item" key={index}>
              <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
              <div className="movieList-item-info">
                <h3>{movie.title}</h3>
                <div className="top-movie-rate">
                  <FaStar className="star-icon" />
                  {movie.vote_average}
                </div>
                <MoviePick
                  MovieChart
                  movieId={movie.id}
                  movieRate={movie.vote_average}
                  moviePoster={movie.poster_path}
                />
                <button
                  onClick={() => props.history.push(`/movie/${movie.id}`)}
                >
                  자세히
                </button>
              </div>
            </div>
          ))}
      </div>
      <Pagenation
        activePage={Page}
        itemsCountPerPage={20}
        totalItemsCount={300}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default withRouter(MovieChart);
