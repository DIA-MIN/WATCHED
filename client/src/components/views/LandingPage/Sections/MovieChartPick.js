import React from 'react';
import {FaPlus} from 'react-icons/fa';
import axios from 'axios';
import {message} from 'antd';
import {useSelector} from 'react-redux';

function MovieChartPick({
  movieId,
  movieRate,
  moviePoster,
  movieTitle,
  mypick,
  refreshUnPick,
}) {
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem('user_id');

  const variables = {
    userId,
    movieId,
    movieRate,
    moviePoster,
    movieTitle,
  };

  const onClickMyPick = () => {
    if (user.userData && user.userData.isAuth) {
      axios.post('/api/favorite/checkPick', variables).then((response) => {
        if (response.data.success) {
          if (response.data.isFavorite) {
            const check = window.confirm(
              '이미 My Pick에 등록된 영화입니다. 리스트에서 제거하시겠습니까?'
            );
            if (check) {
              axios
                .post('/api/favorite/unPickMovie', variables)
                .then((response) => {
                  if (response.data.pickDeleteSuccess) {
                    message.success('My Pick 리스트에서 제거되었습니다.');
                    refreshUnPick(movieId);
                  } else {
                    alert('My Pick 취소에 실패하셨습니다.');
                  }
                });
            }
          } else {
            axios
              .post('/api/favorite/pickMovie', variables)
              .then((response) => {
                if (response.data.pickSuccess) {
                  message.success('My Pick 리스트에 추가되었습니다.');
                } else {
                  alert('My Pick 등록에 실패하셨습니다.');
                }
              });
          }
        } else {
          alert('My Pick Check Fail...');
        }
      });
    } else {
      message.warn('로그인 후 이용 가능합니다.');
    }
  };

  if (mypick) {
    return (
      <button className="movieList-item-myPick clamp" onClick={onClickMyPick}>
        <FaPlus className="plus-icon" />
        My Pick
      </button>
    );
  } else {
    return (
      <button className="movieList-item-myPick" onClick={onClickMyPick}>
        <FaPlus className="plus-icon" />
        My Pick
      </button>
    );
  }
}

export default MovieChartPick;
