import React, {useEffect, useState} from 'react';
import './MovieDetailPage.scss';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import {FaAngleRight, FaAngleDown} from 'react-icons/fa';
import MovieDetailHead from './Sections/MovieDetailHead';
import MovieDetailTrailer from './Sections/MovieDetailTrailer';
import MovieDetailInfo from './Sections/MovieDetailInfo';
import MovieDetailReviewWrite from './Sections/MovieDetailReviewWrite';

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [Trailer, setTrailer] = useState([]);
  const [IsClamp, setIsClamp] = useState(false);

  useEffect(() => {
    const movieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    const movieCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;
    const movieTrailer = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;

    fetch(movieInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(movieCast)
      .then((response) => response.json())
      .then((response) => {
        setCast(response);
      });

    fetch(movieTrailer)
      .then((response) => response.json())
      .then((response) => {
        const videoKey = response.results.filter(
          (list) =>
            list.name.includes('Trailer') || list.name.includes('Teaser')
        )[0].key;
        setTrailer(videoKey);
      });
  }, []);

  const notImage = <div className="notImage">NO IMAGE</div>;

  const onClampCast = () => {
    setIsClamp(!IsClamp);
  };

  return (
    <div className="movieDetailContent">
      <div className="movieDetail-main">
        <MovieDetailHead movie={Movie} />
        <MovieDetailTrailer movieId={movieId} movie={Movie} trailer={Trailer} />
        <MovieDetailInfo movie={Movie} />

        <div className="movieDetail-credits">
          <h1 className="category">
            <div>
              <div className="ColBar"></div>??????
            </div>
            <button className="clamp-cast" onClick={onClampCast}>
              ????????? {IsClamp ? <FaAngleDown /> : <FaAngleRight />}
            </button>
          </h1>
          <p className="subCategory">????????? ???????????? ??????????????????.</p>
          {IsClamp ? (
            <div className="movieDetail-castList">
              {Cast.cast &&
                Cast.cast.map((cast, index) => (
                  <div className="movieDetail-cast" key={index}>
                    {cast.profile_path ? (
                      <img src={`${IMAGE_BASE_URL}w92${cast.profile_path}`} />
                    ) : (
                      notImage
                    )}
                    <div className="castName">
                      <span className="name">{cast.name}</span>
                      <div className="character">
                        <span>{cast.character}</span> ???
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>

        <MovieDetailReviewWrite movieId={movieId} movie={Movie} />
      </div>
    </div>
  );
}

export default MovieDetailPage;
