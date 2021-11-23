import React, {useEffect, useState} from 'react';
import {FaPlus, FaHeart} from 'react-icons/fa';
import axios from 'axios';
import {message} from 'antd';
import {useSelector} from 'react-redux';

function MoviePick({TopMovie, movieId, movieRate, moviePoster, MovieChart}) {
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('user_id');
  const [IsFavorite, setIsFavorite] = useState(false);

  const variables = {
    userId: userId,
    movieId: movieId,
    movieRate: movieRate,
    moviePoster: moviePoster,
  };

  useEffect(() => {
    if (userId && user.loginSuccess.loginSuccess) {
      axios.post('/api/favorite/checkPick', variables).then((response) => {
        if (response.data.success) {
          if (response.data.favorite !== null) {
            setIsFavorite(!IsFavorite);
          } else {
            setIsFavorite(false);
          }
        } else {
          alert('My Pick Check Fail...');
        }
      });
    }
  }, []);

  const onClickMyPick = () => {
    if (userId && user.loginSuccess.loginSuccess) {
      if (IsFavorite) {
        axios.post('/api/favorite/unPickMovie', variables).then((response) => {
          if (response.data.pickDeleteSuccess) {
            setIsFavorite(!IsFavorite);
            message.success('My Pick 리스트에서 제거되었습니다.');
          } else {
            alert('My Pick 취소에 실패하셨습니다.');
          }
        });
      } else {
        axios.post('/api/favorite/pickMovie', variables).then((response) => {
          if (response.data.pickSuccess) {
            setIsFavorite(!IsFavorite);
            message.success('My Pick 리스트에 추가되었습니다.');
          } else {
            alert('My Pick 등록에 실패하셨습니다.');
          }
        });
      }
    } else {
      message.warn('로그인 후 이용 가능합니다.');
    }
  };

  if (TopMovie) {
    return (
      <div>
        <FaHeart
          className={IsFavorite ? 'add-myPick-icon clamp' : 'add-myPick-icon'}
          onClick={onClickMyPick}
        />
      </div>
    );
  } else if (MovieChart) {
    return (
      <button
        className={
          IsFavorite ? 'movieList-item-myPick clamp' : 'movieList-item-myPick'
        }
        onClick={onClickMyPick}
      >
        <FaPlus className="plus-icon" />
        My Pick
      </button>
    );
  }
}

export default MoviePick;
